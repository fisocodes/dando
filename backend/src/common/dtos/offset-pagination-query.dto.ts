import { IsInt, IsOptional, Min } from "class-validator";
import { PaginationQueryDto } from "./pagination-query.dto";

export class OffsetPaginationQueryDto extends PaginationQueryDto {
	@IsInt()
	@IsOptional()
	@Min(1)
	page: number = 1;
}
