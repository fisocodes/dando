import { plainToInstance } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, validateSync } from "class-validator";

export class EnvironmentVariables {
	@IsString()
	@IsNotEmpty()
	DATABASE_HOST?: string;

	@IsInt()
	DATABASE_PORT?: number;

	@IsString()
	@IsNotEmpty()
	DATABASE_USERNAME?: string;

	@IsString()
	@IsNotEmpty()
	DATABASE_PASSWORD?: string;

	@IsString()
	@IsNotEmpty()
	DATABASE_NAME?: string;
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, {
		enableImplicitConversion: true,
	});

	const errors = validateSync(validatedConfig, {
		whitelist: true,
	});

	if (errors.length > 0) throw new Error(errors.toString());
	return validatedConfig;
}
