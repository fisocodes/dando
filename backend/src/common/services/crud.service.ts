import { NotFoundException } from "@nestjs/common";
import type { FindOptionsWhere, Repository } from "typeorm";
import type { BaseEntity } from "../entities/base.entity";

export abstract class CrudService<
	T extends BaseEntity,
	CreateDto,
	UpdateDto,
	ResponseDto,
> {
	constructor(protected readonly repository: Repository<T>) {}

	abstract create(dto: CreateDto): Promise<ResponseDto>;

	async read(id: string): Promise<ResponseDto | null> {
		const entity = await this.repository.findOneBy({
			id,
		} as FindOptionsWhere<T>);
		if (!entity) return null;
		return this.toResponse(entity);
	}

	async readOrThrow(id: string): Promise<ResponseDto> {
		const entity = await this.read(id);

		if (!entity) throw new NotFoundException();

		return entity;
	}

	abstract update(id: string, dto: UpdateDto): Promise<ResponseDto>;

	async delete(id: string): Promise<void> {
		const entity = await this.repository.findOneBy({
			id,
		} as FindOptionsWhere<T>);

		if (!entity) throw new NotFoundException();
		await this.repository.softRemove(entity);
	}

	abstract toResponse(entity: T): ResponseDto;
}
