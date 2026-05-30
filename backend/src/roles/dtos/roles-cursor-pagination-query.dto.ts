import { IsInt, IsOptional, IsString, Min } from "class-validator";
import { CursorPaginationQueryDto } from "../../common/dtos/cursor-pagination-query.dto";

export class RolesCursorQueryDto extends CursorPaginationQueryDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsInt()
	@Min(0)
	priority?: number;
}
