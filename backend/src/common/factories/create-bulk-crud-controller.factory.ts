import {
	Body,
	Delete,
	Get,
	ParseArrayPipe,
	ParseUUIDPipe,
	Patch,
	Post,
	Query,
} from "@nestjs/common";
import type { BaseEntity } from "../entities/base.entity";
import type { CrudService } from "../services/crud.service";

export function createBulkCrudController<
	T extends BaseEntity,
	CreateDto,
	UpdateDto,
	ResponseDto,
>() {
	abstract class BulkCrudController {
		constructor(
			readonly service: CrudService<T, CreateDto, UpdateDto, ResponseDto>,
		) {}

		@Post("bulk")
		create(@Body() dtos: CreateDto[]): Promise<ResponseDto[]> {
			return this.service.create(dtos);
		}

		@Get("bulk")
		read(
			@Query(
				"ids",
				new ParseArrayPipe({ items: ParseUUIDPipe, separator: "," }),
			)
			ids: string[],
		): Promise<ResponseDto[]> {
			return this.service.readOrThrow(ids);
		}

		@Patch("bulk")
		update(
			@Body() dtos: Array<UpdateDto & { id: string }>,
		): Promise<ResponseDto[]> {
			return this.service.update(dtos);
		}

		@Delete("bulk")
		delete(
			@Query(
				"ids",
				new ParseArrayPipe({ items: ParseUUIDPipe, separator: "," }),
			)
			ids: string[],
		): Promise<void> {
			return this.service.delete(ids);
		}
	}

	return BulkCrudController;
}
