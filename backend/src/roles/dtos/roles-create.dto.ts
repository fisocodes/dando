import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class RolesCreateDto {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsString()
	@IsOptional()
	description?: string;

	@IsInt()
	@IsOptional()
	@Min(0)
	priority: number = 0;
}
