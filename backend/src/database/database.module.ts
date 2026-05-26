import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigurationModule } from "../configuration/configuration.module";
import { ConfigurationService } from "../configuration/configuration.service";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigurationModule],
			useFactory: (configurationService: ConfigurationService) => ({
				type: "postgres",
				host: configurationService.databaseHost,
				port: configurationService.databasePort,
				username: configurationService.databaseUsername,
				password: configurationService.databasePassword,
				database: configurationService.databaseName,
				autoLoadEntities: true,
			}),
			inject: [ConfigurationService],
		}),
	],
})
export class DatabaseModule {}
