import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { ConfigurationVariables } from "./configuration.variables";

@Injectable()
export class ConfigurationService {
	constructor(
		private readonly configService: ConfigService<ConfigurationVariables, true>,
	) {}

	get appPort(): number {
		return this.configService.get("APP_PORT");
	}

	get appVersion(): string {
		return this.configService.get("APP_VERSION");
	}

	get databaseHost(): string {
		return this.configService.get("DATABASE_HOST");
	}

	get databaseName(): string {
		return this.configService.get("DATABASE_NAME");
	}

	get databasePassword(): string {
		return this.configService.get("DATABASE_PASSWORD");
	}

	get databasePort(): number {
		return this.configService.get("DATABASE_PORT");
	}

	get databaseUsername(): string {
		return this.configService.get("DATABASE_USERNAME");
	}

	get redisHost(): string {
		return this.configService.get("REDIS_HOST");
	}

	get redisPort(): number {
		return this.configService.get("REDIS_PORT");
	}

	get redisPassword(): string {
		return this.configService.get("REDIS_PASSWORD");
	}
}
