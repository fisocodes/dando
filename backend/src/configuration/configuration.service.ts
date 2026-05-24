import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { EnvironmentVariables } from "./configuration.validation";

@Injectable()
export class ConfigurationService {
	constructor(
		private configService: ConfigService<EnvironmentVariables, true>,
	) {}

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
}
