import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConfigurationService } from "./configuration.service";
import { validate } from "./configuration.validation";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validate,
		}),
	],
	providers: [ConfigurationService],
	exports: [ConfigurationService],
})
export class ConfigurationModule {}
