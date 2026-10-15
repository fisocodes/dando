import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";

import { ConfigurationService } from "../configuration/configuration.service";

@Module({
	imports: [
		BullModule.forRootAsync({
			inject: [ConfigurationService],
			useFactory: (configurationService: ConfigurationService) => ({
				connection: {
					host: configurationService.redisHost,
					password: configurationService.redisPassword,
					port: configurationService.redisPort,
				},
			}),
		}),
	],
})
export class QueueModule {}
