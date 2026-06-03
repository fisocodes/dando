import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { EnvironmentVariables } from "./configuration.validation";

@Injectable()
export class ConfigurationService {
	constructor(
		private configService: ConfigService<EnvironmentVariables, true>,
	) {}

	get dandoVersion(): string {
		return this.configService.get("DANDO_VERSION");
	}

	get dandoPort(): string {
		return this.configService.get("DANDO_PORT");
	}

	get databaseHost(): string {
		return this.configService.get("DATABASE_HOST");
	}

	get databasePort(): number {
		return this.configService.get("DATABASE_PORT");
	}

	get databaseUsername(): string {
		return this.configService.get("DATABASE_USERNAME");
	}

	get databasePassword(): string {
		return this.configService.get("DATABASE_PASSWORD");
	}

	get databaseName(): string {
		return this.configService.get("DATABASE_NAME");
	}

	get smtpHost(): string {
		return this.configService.get("SMTP_HOST");
	}

	get smtpPort(): number {
		return this.configService.get("SMTP_PORT");
	}

	get smtpUser(): string {
		return this.configService.get("SMTP_USER");
	}

	get smtpPassword(): string {
		return this.configService.get("SMTP_PASSWORD");
	}

	get smtpFrom(): string {
		return this.configService.get("SMTP_FROM");
	}

	get otpTtlMs(): number {
		return this.configService.get("OTP_TTL_MS");
	}

	get otpLength(): number {
		return this.configService.get("OTP_LENGTH");
	}

	get otpAlphabet(): string {
		return this.configService.get("OTP_ALPHABET");
	}
}
