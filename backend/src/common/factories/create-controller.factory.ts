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
	SetMetadata,
	ValidationPipe,
} from "@nestjs/common";
import { CaslSubject } from "../casl/constants/casl-subject.constant";
import { CaslUser } from "../casl/interfaces/casl-user.interface";
import { User } from "../decorators/user.decorator";
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
	subject: CaslSubject,
) {
	@SetMetadata("casl_subject", subject)
	abstract class Controller {
		constructor(
			readonly crudservice: CrudService<T, CreateDto, UpdateDto, ResponseDto>,
			readonly paginationService: PaginationService<T, ResponseDto>,
		) {}

		@Post("bulk")
		createMany(
			@Body() dtos: CreateDto[],
			@User() user: CaslUser,
		): Promise<ResponseDto[]> {
			return this.crudservice.create(dtos, user);
		}

		@Get("bulk")
		readMany(
			@Query(
				"ids",
				new ParseArrayPipe({ items: ParseUUIDPipe, separator: "," }),
			)
			ids: string[],
			@User() user: CaslUser,
		): Promise<ResponseDto[]> {
			return this.crudservice.readOrThrow(ids, user);
		}

		@Patch("bulk")
		updateMany(
			@Body() dtos: Array<UpdateDto & { id: string }>,
			@User() user: CaslUser,
		): Promise<ResponseDto[]> {
			return this.crudservice.update(dtos, user);
		}

		@Delete("bulk")
		deleteMany(
			@Query(
				"ids",
				new ParseArrayPipe({ items: ParseUUIDPipe, separator: "," }),
			)
			ids: string[],
			@User() user: CaslUser,
		): Promise<void> {
			return this.crudservice.delete(ids, user);
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
		async create(
			@Body() dto: CreateDto,
			@User() user: CaslUser,
		): Promise<ResponseDto> {
			const [result] = await this.crudservice.create([dto], user);
			return result;
		}

		@Get(":id")
		async read(
			@Param("id", ParseUUIDPipe) id: string,
			@User() user: CaslUser,
		): Promise<ResponseDto> {
			const [result] = await this.crudservice.readOrThrow([id], user);
			return result;
		}

		@Patch(":id")
		async update(
			@Param("id", ParseUUIDPipe) id: string,
			@Body() dto: UpdateDto,
			@User() user: CaslUser,
		): Promise<ResponseDto> {
			const [result] = await this.crudservice.update([{ ...dto, id }], user);
			return result;
		}

		@Delete(":id")
		delete(
			@Param("id", ParseUUIDPipe) id: string,
			@User() user: CaslUser,
		): Promise<void> {
			return this.crudservice.delete([id], user);
		}
	}

	return Controller;
}
