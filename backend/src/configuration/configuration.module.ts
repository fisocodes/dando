import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { validate } from "./configuration.validation";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validate,
		}),
	],
})
export class ConfigurationModule {}
