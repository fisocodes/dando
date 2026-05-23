import {
	Body,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from "@nestjs/common";
import type { BaseEntity } from "../entities/base.entity";
import type { CrudService } from "../services/crud.service";

export function createCrudController<
	T extends BaseEntity,
	CreateDto,
	UpdateDto,
	ResponseDto,
>() {
	abstract class CrudController {
		constructor(
			readonly service: CrudService<T, CreateDto, UpdateDto, ResponseDto>,
		) {}

		@Post()
		create(@Body() dto: CreateDto): Promise<ResponseDto> {
			return this.service.create(dto);
		}

		@Get(":id")
		read(@Param("id", ParseUUIDPipe) id: string): Promise<ResponseDto> {
			return this.service.readOrThrow(id);
		}

		@Patch(":id")
		update(
			@Param("id", ParseUUIDPipe) id: string,
			@Body() dto: UpdateDto,
		): Promise<ResponseDto> {
			return this.service.update(id, dto);
		}

		@Delete(":id")
		delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
			return this.service.delete(id);
		}
	}

	return CrudController;
}
