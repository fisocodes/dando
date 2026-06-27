import { plainToInstance } from "class-transformer";
import {
	IsEmail,
	IsFQDN,
	IsInt,
	IsNotEmpty,
	IsPort,
	IsString,
	Matches,
	validateSync,
} from "class-validator";

export class EnvironmentVariables {
	@Matches(/^\d+\.\d+\.\d+$/)
	DANDO_VERSION!: string;

	@IsInt()
	DANDO_PORT!: number;

	@IsString()
	@IsNotEmpty()
	DATABASE_HOST!: string;

	@IsInt()
	DATABASE_PORT!: number;

	@IsString()
	@IsNotEmpty()
	DATABASE_USERNAME!: string;

	@IsString()
	@IsNotEmpty()
	DATABASE_PASSWORD!: string;

	@IsString()
	@IsNotEmpty()
	DATABASE_NAME!: string;

	@IsFQDN()
	SMTP_HOST!: string;

	@IsPort()
	SMTP_PORT!: string;

	@IsString()
	@IsNotEmpty()
	SMTP_USER!: string;

	@IsString()
	@IsNotEmpty()
	SMTP_PASSWORD!: string;

	@IsEmail()
	SMTP_FROM!: string;

	@IsInt()
	OTP_TTL_MS!: number;

	@IsInt()
	OTP_LENGTH!: number;

	@IsString()
	@IsNotEmpty()
	OTP_ALPHABET!: string;

	@IsString()
	@IsNotEmpty()
	JWT_EXPIRY!: string;

	@IsEmail()
	ADMIN_EMAIL!: string;
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
