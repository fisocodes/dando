import { Get, Query, ValidationPipe } from "@nestjs/common";
import type { CursorPaginationQueryDto } from "../dtos/cursor-pagination-query.dto";
import type { CursorPaginationResponseDto } from "../dtos/cursor-pagination-response.dto";
import type { OffsetPaginationQueryDto } from "../dtos/offset-pagination-query.dto";
import type { OffsetPaginationResponseDto } from "../dtos/offset-pagination-response.dto";
import type { BaseEntity } from "../entities/base.entity";
import type { PaginationService } from "../services/pagination.service";

export function createPaginationController<
	T extends BaseEntity,
	ResponseDto,
	OffsetQueryDto extends OffsetPaginationQueryDto,
	CursorQueryDto extends CursorPaginationQueryDto,
>(
	offsetQueryDtoClass: new () => OffsetQueryDto,
	cursorQuerytDtoClass: new () => CursorQueryDto,
) {
	abstract class PaginationController {
		constructor(readonly service: PaginationService<T, ResponseDto>) {}

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
			return this.service.findWithOffset(query);
		}

		@Get("cursor")
		findWithCursor(
			@Query(
				new ValidationPipe({
					transform: true,
					expectedType: cursorQuerytDtoClass,
				}),
			)
			query: CursorQueryDto,
		): Promise<CursorPaginationResponseDto<ResponseDto>> {
			return this.service.findWithCursor(query);
		}
	}

	return PaginationController;
}
