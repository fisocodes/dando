import {
	IsDateString,
	IsInt,
	IsOptional,
	IsString,
	IsUUID,
	Max,
	Min,
} from "class-validator";

export class PaginationQueryDto {
	@IsOptional()
	@IsUUID()
	id?: string;

	@IsOptional()
	@IsString()
	search?: string;

	@IsOptional()
	@IsDateString()
	createdAtFrom?: Date;

	@IsOptional()
	@IsDateString()
	createdAtTo?: Date;

	@IsOptional()
	@IsDateString()
	updatedAtFrom?: Date;

	@IsOptional()
	@IsDateString()
	updatedAtTo?: Date;

	@IsInt()
	@IsOptional()
	@Min(1)
	@Max(200)
	limit: number = 10;
}
