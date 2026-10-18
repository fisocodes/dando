import { NotFoundException } from "@nestjs/common";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { FindOptionsWhere, Repository } from "typeorm";
import { CrudResponseDto } from "../dto/crud-response.dto";
import { BaseEntity } from "../entities/base.entity";

export abstract class CrudService<
	T extends BaseEntity,
	CreateDto,
	UpdateDto,
	ResponseDto extends CrudResponseDto,
> {
	constructor(
		protected readonly repository: Repository<T>,
		private readonly responseDto: ClassConstructor<ResponseDto>,
	) {}

	abstract create(dto: CreateDto): Promise<ResponseDto>;

	async read(id: string): Promise<ResponseDto> {
		const resource = await this.findOrFail(id);
		return this.toResponse(resource);
	}
	abstract update(id: string, dto: UpdateDto): Promise<ResponseDto>;

	async delete(id: string): Promise<void> {
		await this.findOrFail(id);
		await this.repository.softDelete(id);
	}

	protected toResponse(entity: T): ResponseDto {
		return plainToInstance(this.responseDto, entity, {
			excludeExtraneousValues: true,
		});
	}

	protected async findOrFail(id: string): Promise<T> {
		const resource = await this.repository.findOneBy({
			id,
		} as FindOptionsWhere<T>);
		if (!resource) throw new NotFoundException();
		return resource;
	}
}
