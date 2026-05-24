import { IsInt, IsOptional, Max, Min } from "class-validator";

export class OffsetPaginationQueryDto {
	@IsInt()
	@IsOptional()
	@Min(1)
	page: number = 1;

	@IsInt()
	@IsOptional()
	@Min(1)
	@Max(200)
	limit: number = 10;
}
