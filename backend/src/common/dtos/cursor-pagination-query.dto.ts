import { IsEnum, IsInt, IsOptional, IsUUID, Max, Min } from "class-validator";
import { CursorPaginationDirection } from "../enums/cursor-pagination-direction.enum";

export class CursorPaginationQueryDto {
	@IsOptional()
	@IsUUID()
	cursor?: string;

	@IsEnum(CursorPaginationDirection)
	@IsOptional()
	direction: CursorPaginationDirection = CursorPaginationDirection.NEXT;

	@IsInt()
	@IsOptional()
	@Min(1)
	@Max(200)
	limit: number = 10;
}
