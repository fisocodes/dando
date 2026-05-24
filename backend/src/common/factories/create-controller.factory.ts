import {
	Body,
	Delete,
	Get,
	Param,
	ParseArrayPipe,
	ParseUUIDPipe,
	Patch,
	Post,
	Query,
	ValidationPipe,
} from "@nestjs/common";
import type { CursorPaginationQueryDto } from "../dtos/cursor-pagination-query.dto";
import type { CursorPaginationResponseDto } from "../dtos/cursor-pagination-response.dto";
import type { OffsetPaginationQueryDto } from "../dtos/offset-pagination-query.dto";
import type { OffsetPaginationResponseDto } from "../dtos/offset-pagination-response.dto";
import type { BaseEntity } from "../entities/base.entity";
import type { CrudService } from "../services/crud.service";
import type { PaginationService } from "../services/pagination.service";

export function createController<
	T extends BaseEntity,
	CreateDto,
	UpdateDto,
	ResponseDto,
	OffsetQueryDto extends OffsetPaginationQueryDto,
	CursorQueryDto extends CursorPaginationQueryDto,
>(
	offsetQueryDtoClass: new () => OffsetQueryDto,
	cursorQueryDtoClass: new () => CursorQueryDto,
) {
	abstract class Controller {
		constructor(
			readonly crudservice: CrudService<T, CreateDto, UpdateDto, ResponseDto>,
			readonly paginationService: PaginationService<T, ResponseDto>,
		) {}

		@Post("bulk")
		createMany(@Body() dtos: CreateDto[]): Promise<ResponseDto[]> {
			return this.crudservice.create(dtos);
		}

		@Get("bulk")
		readMany(
			@Query(
				"ids",
				new ParseArrayPipe({ items: ParseUUIDPipe, separator: "," }),
			)
			ids: string[],
		): Promise<ResponseDto[]> {
			return this.crudservice.readOrThrow(ids);
		}

		@Patch("bulk")
		updateMany(
			@Body() dtos: Array<UpdateDto & { id: string }>,
		): Promise<ResponseDto[]> {
			return this.crudservice.update(dtos);
		}

		@Delete("bulk")
		deleteMany(
			@Query(
				"ids",
				new ParseArrayPipe({ items: ParseUUIDPipe, separator: "," }),
			)
			ids: string[],
		): Promise<void> {
			return this.crudservice.delete(ids);
		}

		@Get("offset")
		findWithOffset(
			@Query(
				new ValidationPipe({
					transform: true,
					expectedType: offsetQueryDtoClass,
				}),
			)
			query: OffsetQueryDto,
		): Promise<OffsetPaginationResponseDto<ResponseDto>> {
			return this.paginationService.findWithOffset(query);
		}

		@Get("cursor")
		findWithCursor(
			@Query(
				new ValidationPipe({
					transform: true,
					expectedType: cursorQueryDtoClass,
				}),
			)
			query: CursorQueryDto,
		): Promise<CursorPaginationResponseDto<ResponseDto>> {
			return this.paginationService.findWithCursor(query);
		}

		@Post()
		async create(@Body() dto: CreateDto): Promise<ResponseDto> {
			const [result] = await this.crudservice.create([dto]);
			return result;
		}

		@Get(":id")
		async read(@Param("id", ParseUUIDPipe) id: string): Promise<ResponseDto> {
			const [result] = await this.crudservice.readOrThrow([id]);
			return result;
		}

		@Patch(":id")
		async update(
			@Param("id", ParseUUIDPipe) id: string,
			@Body() dto: UpdateDto,
		): Promise<ResponseDto> {
			const [result] = await this.crudservice.update([{ ...dto, id }]);
			return result;
		}

		@Delete(":id")
		delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
			return this.crudservice.delete([id]);
		}
	}

	return Controller;
}
