import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class ConfigurationVariables {
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	@Max(65_535)
	APP_PORT!: number;

	@Type(() => Number)
	@IsNumber()
	@Min(1)
	@Max(65_535)
	DATABASE_PORT!: number;

	@IsString()
	@IsNotEmpty()
	DATABASE_HOST!: string;

	@IsString()
	@IsNotEmpty()
	DATABASE_NAME!: string;

	@IsString()
	@IsNotEmpty()
	DATABASE_USERNAME!: string;

	@IsString()
	@IsNotEmpty()
	DATABASE_PASSWORD!: string;
}
