import { Module } from "@nestjs/common";
import { ConfigurationModule } from "./configuration/configuration.module";
import { DatabaseModule } from "./database/database.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { RolesModule } from "./roles/roles.module";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [
		ConfigurationModule,
		DatabaseModule,
		PermissionsModule,
		RolesModule,
		UsersModule,
	],
})
export class AppModule {}
