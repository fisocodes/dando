import { NotFoundException } from "@nestjs/common";
import {
	type DataSource,
	type FindOptionsWhere,
	In,
	type QueryRunner,
	type Repository,
} from "typeorm";
import type { BaseEntity } from "../entities/base.entity";

export abstract class CrudService<
	T extends BaseEntity,
	CreateDto,
	UpdateDto,
	ResponseDto,
> {
	constructor(
		protected readonly repository: Repository<T>,
		protected readonly dataSource: DataSource,
	) {}

	abstract create(dtos: CreateDto[]): Promise<ResponseDto[]>;

	async read(ids: string[]): Promise<ResponseDto[]> {
		const entities = await this.repository.findBy({
			id: In(ids),
		} as FindOptionsWhere<T>);
		return entities.map((entity) => this.toResponse(entity));
	}

	async readOrThrow(ids: string[]): Promise<ResponseDto[]> {
		const entities = await this.repository.findBy({
			id: In(ids),
		} as FindOptionsWhere<T>);
		if (entities.length !== ids.length) throw new NotFoundException();

		return entities.map((entity) => this.toResponse(entity));
	}

	abstract update(
		dtos: Array<UpdateDto & { id: string }>,
	): Promise<ResponseDto[]>;

	async delete(ids: string[]): Promise<void> {
		await this.withTransaction(async (queryRunner) => {
			const entities = await queryRunner.manager.findBy(
				this.repository.target,
				{ id: In(ids) } as FindOptionsWhere<T>,
			);
			if (entities.length !== ids.length) throw new NotFoundException();
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
