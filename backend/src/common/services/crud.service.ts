import { subject } from "@casl/ability";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import {
	type DataSource,
	type FindOptionsWhere,
	In,
	type QueryRunner,
	type Repository,
} from "typeorm";
import { CaslAbilityFactory } from "../casl/casl-ability.factory";
import { CaslAction } from "../casl/constants/casl-action.constant";
import { CaslSubject } from "../casl/constants/casl-subject.constant";
import { CaslUser } from "../casl/interfaces/casl-user.interface";
import { BaseResponseDto } from "../dtos/base-response.dto";
import type { BaseEntity } from "../entities/base.entity";

export abstract class CrudService<
	T extends BaseEntity,
	CreateDto,
	UpdateDto,
	ResponseDto extends BaseResponseDto,
> {
	constructor(
		protected readonly repository: Repository<T>,
		protected readonly dataSource: DataSource,
		protected readonly caslAbilityFactory: CaslAbilityFactory,
		protected readonly responseDtoClass: new () => ResponseDto,
	) {}
	abstract readonly caslSubject: CaslSubject;

	protected abilitiesFor(user?: CaslUser) {
		const ability = user ? this.caslAbilityFactory.createForUser(user) : null;

		const can = (action: CaslAction, entity: T): boolean => {
			if (!ability) return true;
			return ability.can(action, subject(this.caslSubject, entity));
		};

		const cannot = (action: CaslAction, entity: T): boolean => {
			if (!ability) return true;
			return ability.cannot(action, subject(this.caslSubject, entity));
		};

		return {
			canCreate: (entity: T) => can(CaslAction.CREATE, entity),
			canRead: (entity: T) => can(CaslAction.READ, entity),
			canUpdate: (entity: T) => can(CaslAction.UPDATE, entity),
			canDelete: (entity: T) => can(CaslAction.UPDATE, entity),

			cannotCreate: (entity: T) => cannot(CaslAction.CREATE, entity),
			cannotRead: (entity: T) => cannot(CaslAction.READ, entity),
			cannotUpdate: (entity: T) => cannot(CaslAction.UPDATE, entity),
			cannotDelete: (entity: T) => cannot(CaslAction.UPDATE, entity),
		};
	}

	abstract create(dtos: CreateDto[], user?: CaslUser): Promise<ResponseDto[]>;

	async read(ids: string[], user?: CaslUser): Promise<ResponseDto[]> {
		const { cannotRead } = this.abilitiesFor(user);
		const entities = await this.repository.findBy({
			id: In(ids),
		} as FindOptionsWhere<T>);
		entities.forEach((entity) => {
			if (cannotRead(entity)) throw new ForbiddenException();
		});
		return entities.map((entity) => this.toResponse(entity));
	}

	async readOrThrow(ids: string[], user?: CaslUser): Promise<ResponseDto[]> {
		const { cannotRead } = this.abilitiesFor(user);
		const entities = await this.repository.findBy({
			id: In(ids),
		} as FindOptionsWhere<T>);
		if (entities.length !== ids.length) throw new NotFoundException();
		entities.forEach((entity) => {
			if (cannotRead(entity)) throw new ForbiddenException();
		});
		return entities.map((entity) => this.toResponse(entity));
	}

	abstract update(
		dtos: Array<UpdateDto & { id: string }>,
		user?: CaslUser,
	): Promise<ResponseDto[]>;

	async delete(ids: string[], user?: CaslUser): Promise<void> {
		const { cannotDelete } = this.abilitiesFor(user);
		await this.dataSource.transaction(async (manager) => {
			const entities = await manager.findBy(this.repository.target, {
				id: In(ids),
			} as FindOptionsWhere<T>);
			if (entities.length !== ids.length) throw new NotFoundException();
			entities.forEach((entity) => {
				if (cannotDelete(entity)) throw new ForbiddenException();
			});
			await manager.softRemove(entities);
		});
	}

	toResponse(entity: T): ResponseDto {
		return plainToInstance(this.responseDtoClass, entity);
	}

	protected async withTransaction<R>(
		fn: (queryRunner: QueryRunner) => Promise<R>,
	): Promise<R> {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			const result = await fn(queryRunner);
			await queryRunner.commitTransaction();
			return result;
		} catch (e) {
			await queryRunner.rollbackTransaction();
			throw e;
		} finally {
			await queryRunner.release();
		}
	}
}
