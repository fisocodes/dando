import { plainToInstance } from "class-transformer";
import { type FindOptionsWhere, type Repository } from "typeorm";
import { BaseResponseDto } from "../dtos/base-response.dto";
import type { BaseEntity } from "../entities/base.entity";
import { QueryService } from "./query.service";

export abstract class CrudService<
	T extends BaseEntity,
	CreateDto,
	UpdateDto,
	ResponseDto extends BaseResponseDto,
> {
	constructor(
		protected readonly repository: Repository<T>,
		protected readonly queryService: QueryService<T>,
		protected readonly responseDtoClass: new () => ResponseDto,
	) {}

	abstract create(dto: CreateDto): Promise<ResponseDto>;

	async read(id: string): Promise<ResponseDto> {
		const entity = await this.queryService.findOneByOrThrow({
			id,
		} as FindOptionsWhere<T>);
		return this.toResponse(entity);
	}

	abstract update(id: string, dto: UpdateDto): Promise<ResponseDto>;

	async delete(id: string): Promise<void> {
		const entity = await this.queryService.findOneByOrThrow({
			id,
		} as FindOptionsWhere<T>);
		await this.repository.softRemove(entity);
	}

	protected toResponse(entity: T): ResponseDto {
		return plainToInstance(this.responseDtoClass, entity);
	}
}
