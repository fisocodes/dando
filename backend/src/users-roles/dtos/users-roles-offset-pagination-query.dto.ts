import { IsOptional, IsUUID } from "class-validator";
import { OffsetPaginationQueryDto } from "../../common/dtos/offset-pagination-query.dto";

export class UsersRolesOffsetQueryDto extends OffsetPaginationQueryDto {
	@IsOptional()
	@IsUUID()
	userId?: string;

	@IsOptional()
	@IsUUID()
	roleId?: string;
}
