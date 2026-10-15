import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { ConfigurationService } from "./configuration.service";
import { validate } from "./configuration.validate";

@Global()
@Module({
	exports: [ConfigurationService],
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validate,
		}),
	],
	providers: [ConfigurationService],
})
export class ConfigurationModule {}
