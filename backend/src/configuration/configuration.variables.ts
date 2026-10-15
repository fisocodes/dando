import { Type } from "class-transformer";
import {
	IsNotEmpty,
	IsNumber,
	IsString,
	Matches,
	Max,
	Min,
} from "class-validator";

export class ConfigurationVariables {
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	@Max(65_535)
	APP_PORT!: number;

	@IsString()
	@Matches(
		/^(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<fix>0|[1-9]\d*)$/u,
		{
			message: "version must be in the format major.minor.fix (e.g. 1.4.2)",
		},
	)
	APP_VERSION: string;

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

	@Type(() => Number)
	@IsNumber()
	@Min(1)
	@Max(65_535)
	REDIS_PORT!: number;

	@IsString()
	@IsNotEmpty()
	REDIS_HOST!: string;

	@IsString()
	@IsNotEmpty()
	REDIS_PASSWORD!: string;
}
