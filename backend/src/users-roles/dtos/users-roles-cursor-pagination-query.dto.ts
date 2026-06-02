import { IsOptional, IsUUID } from "class-validator";
import { CursorPaginationQueryDto } from "../../common/dtos/cursor-pagination-query.dto";

export class UsersRolesCursorQueryDto extends CursorPaginationQueryDto {
	@IsOptional()
	@IsUUID()
	userId?: string;

	@IsOptional()
	@IsUUID()
	roleId?: string;
}
