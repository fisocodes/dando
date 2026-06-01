import { IsOptional, IsUUID } from "class-validator";
import { OffsetPaginationQueryDto } from "../../common/dtos/offset-pagination-query.dto";

export class RolesPermissionsOffsetQueryDto extends OffsetPaginationQueryDto {
	@IsOptional()
	@IsUUID()
	roleId?: string;

	@IsOptional()
	@IsUUID()
	permissionId?: string;
}
