import { IsInt, IsOptional, IsString, Min } from "class-validator";
import { OffsetPaginationQueryDto } from "../../common/dtos/offset-pagination-query.dto";

export class RolesOffsetQueryDto extends OffsetPaginationQueryDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsInt()
	@Min(0)
	priority?: number;
}
