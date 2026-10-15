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
}
