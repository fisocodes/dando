import { Module } from "@nestjs/common";
import { CaslModule } from "./common/casl/casl.module";
import { ConfigurationModule } from "./configuration/configuration.module";
import { DatabaseModule } from "./database/database.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { RolesModule } from "./roles/roles.module";

@Module({
	imports: [
		ConfigurationModule,
		CaslModule,
		DatabaseModule,
		PermissionsModule,
		RolesModule,
	],
})
export class AppModule {}
