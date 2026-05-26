import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { CursorPaginationDirection } from "../enums/cursor-pagination-direction.enum";
import { PaginationQueryDto } from "./pagination-query.dto";

export class CursorPaginationQueryDto extends PaginationQueryDto {
	@IsOptional()
	@IsUUID()
	cursor?: string;

	@IsEnum(CursorPaginationDirection)
	@IsOptional()
	direction: CursorPaginationDirection = CursorPaginationDirection.NEXT;
}
