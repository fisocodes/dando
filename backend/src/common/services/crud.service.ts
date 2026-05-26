import { subject } from "@casl/ability";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
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
	) {}
	abstract readonly caslSubject: CaslSubject;

	private checkAbility(action: CaslAction, entity: T, user?: CaslUser) {
		if (!user) return;
		const ability = this.caslAbilityFactory.createForUser(user);
		if (
			!ability.can(
				action,
				subject(this.caslSubject, entity as Record<string, unknown>),
			)
		) {
			throw new ForbiddenException();
		}
	}

	abstract create(dtos: CreateDto[], user?: CaslUser): Promise<ResponseDto[]>;

	async read(ids: string[], user?: CaslUser): Promise<ResponseDto[]> {
		const entities = await this.repository.findBy({
			id: In(ids),
		} as FindOptionsWhere<T>);
		entities.forEach((entity) => {
			this.checkAbility(CaslAction.READ, entity, user);
		});
		return entities.map((entity) => this.toResponse(entity));
	}

	async readOrThrow(ids: string[], user?: CaslUser): Promise<ResponseDto[]> {
		const entities = await this.repository.findBy({
			id: In(ids),
		} as FindOptionsWhere<T>);
		if (entities.length !== ids.length) throw new NotFoundException();
		entities.forEach((entity) => {
			this.checkAbility(CaslAction.READ, entity, user);
		});
		return entities.map((entity) => this.toResponse(entity));
	}

	abstract update(
		dtos: Array<UpdateDto & { id: string }>,
		user?: CaslUser,
	): Promise<ResponseDto[]>;

	async delete(ids: string[], user?: CaslUser): Promise<void> {
		await this.withTransaction(async (queryRunner) => {
			const entities = await queryRunner.manager.findBy(
				this.repository.target,
				{ id: In(ids) } as FindOptionsWhere<T>,
			);
			if (entities.length !== ids.length) throw new NotFoundException();
			entities.forEach((entity) => {
				this.checkAbility(CaslAction.DELETE, entity, user);
			});
			await queryRunner.manager.softRemove<T>(entities);
		});
	}

	abstract toResponse(entity: T): ResponseDto;

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
