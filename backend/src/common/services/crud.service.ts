import { NotFoundException } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { BaseEntity } from "../entities/base.entity";

export abstract class CrudService<T extends BaseEntity, CreateDto, UpdateDto> {
	constructor(protected readonly repository: Repository<T>) {}

	abstract create(dto: CreateDto): Promise<T>;

	async read(id: string): Promise<T> {
		const resource = await this.repository.findOneBy({
			id,
		} as FindOptionsWhere<T>);
		if (!resource) throw new NotFoundException();
		return resource;
	}
	abstract update(id: string, dto: UpdateDto): Promise<T>;

	async delete(id: string): Promise<void> {
		await this.read(id);
		await this.repository.softDelete(id);
	}
}
