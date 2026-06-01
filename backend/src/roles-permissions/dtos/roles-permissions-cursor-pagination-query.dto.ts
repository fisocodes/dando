import { IsOptional, IsUUID } from "class-validator";
import { CursorPaginationQueryDto } from "../../common/dtos/cursor-pagination-query.dto";

export class RolesPermissionsCursorQueryDto extends CursorPaginationQueryDto {
	@IsOptional()
	@IsUUID()
	roleId?: string;

	@IsOptional()
	@IsUUID()
	permissionId?: string;
}
