import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ConfigurationModule } from "../configuration/configuration.module";
import { ConfigurationService } from "../configuration/configuration.service";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigurationModule],
			inject: [ConfigurationService],
			useFactory: (configurationService: ConfigurationService) => ({
				autoLoadEntities: true,
				database: configurationService.databaseName,
				host: configurationService.databaseHost,
				password: configurationService.databasePassword,
				port: configurationService.databasePort,
				type: "postgres",
				username: configurationService.databaseUsername,
			}),
		}),
	],
})
export class DatabaseModule {}
