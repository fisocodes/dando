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
import {
	ApiBody,
	ApiExtraModels,
	ApiQuery,
	ApiResponse,
	getSchemaPath,
} from "@nestjs/swagger";
import { CaslSubject } from "../casl/constants/casl-subject.constant";
import { CaslUser } from "../casl/interfaces/casl-user.interface";
import { User } from "../decorators/user.decorator";
import { BaseResponseDto } from "../dtos/base-response.dto";
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
	ResponseDto extends BaseResponseDto,
	OffsetQueryDto extends OffsetPaginationQueryDto,
	CursorQueryDto extends CursorPaginationQueryDto,
>(
	createDtoClass: new () => CreateDto,
	updateDtoClass: new () => UpdateDto,
	responseDtoClass: new () => ResponseDto,
	offsetQueryDtoClass: new () => OffsetQueryDto,
	cursorQueryDtoClass: new () => CursorQueryDto,
	subject: CaslSubject,
) {
	@SetMetadata("casl_subject", subject)
	@ApiExtraModels(
		createDtoClass,
		updateDtoClass,
		responseDtoClass,
		offsetQueryDtoClass,
		cursorQueryDtoClass,
	)
	abstract class Controller {
		constructor(
			readonly crudservice: CrudService<T, CreateDto, UpdateDto, ResponseDto>,
			readonly paginationService: PaginationService<T, ResponseDto>,
		) {}

		@Post("bulk")
		@ApiBody({ type: createDtoClass, isArray: true })
		@ApiResponse({ status: 201, type: responseDtoClass, isArray: true })
		createMany(
			@Body() dtos: CreateDto[],
			@User() user: CaslUser,
		): Promise<ResponseDto[]> {
			return this.crudservice.create(dtos, user);
		}

		@Get("bulk")
		@ApiResponse({ status: 200, type: responseDtoClass, isArray: true })
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
		@ApiBody({ type: updateDtoClass, isArray: true })
		@ApiResponse({ status: 200, type: responseDtoClass, isArray: true })
		updateMany(
			@Body() dtos: Array<UpdateDto & { id: string }>,
			@User() user: CaslUser,
		): Promise<ResponseDto[]> {
			return this.crudservice.update(dtos, user);
		}

		@Delete("bulk")
		@ApiResponse({ status: 204 })
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
		@ApiQuery({ type: offsetQueryDtoClass })
		@ApiResponse({
			status: 200,
			schema: {
				allOf: [
					{
						properties: {
							data: {
								type: "array",
								items: { $ref: getSchemaPath(responseDtoClass) },
							},
							total: { type: "number" },
							page: { type: "number" },
							limit: { type: "number" },
							totalPages: { type: "number" },
							hasNextPage: { type: "boolean" },
							hasPreviousPage: { type: "boolean" },
						},
					},
				],
			},
		})
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
		@ApiQuery({ type: cursorQueryDtoClass })
		@ApiResponse({
			status: 200,
			schema: {
				allOf: [
					{
						properties: {
							data: {
								type: "array",
								items: { $ref: getSchemaPath(responseDtoClass) },
							},
							nextCursor: { type: "string", nullable: true },
							previousCursor: { type: "string", nullable: true },
						},
					},
				],
			},
		})
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
		@ApiBody({ type: createDtoClass })
		@ApiResponse({ status: 201, type: responseDtoClass })
		async create(
			@Body() dto: CreateDto,
			@User() user: CaslUser,
		): Promise<ResponseDto> {
			const [result] = await this.crudservice.create([dto], user);
			return result;
		}

		@Get(":id")
		@ApiResponse({ status: 200, type: responseDtoClass })
		async read(
			@Param("id", ParseUUIDPipe) id: string,
			@User() user: CaslUser,
		): Promise<ResponseDto> {
			const [result] = await this.crudservice.readOrThrow([id], user);
			return result;
		}

		@Patch(":id")
		@ApiBody({ type: updateDtoClass })
		@ApiResponse({ status: 200, type: responseDtoClass })
		async update(
			@Param("id", ParseUUIDPipe) id: string,
			@Body() dto: UpdateDto,
			@User() user: CaslUser,
		): Promise<ResponseDto> {
			const [result] = await this.crudservice.update([{ ...dto, id }], user);
			return result;
		}

		@Delete(":id")
		@ApiResponse({ status: 204 })
		delete(
			@Param("id", ParseUUIDPipe) id: string,
			@User() user: CaslUser,
		): Promise<void> {
			return this.crudservice.delete([id], user);
		}
	}

	return Controller;
}
