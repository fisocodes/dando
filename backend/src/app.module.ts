import { Module } from "@nestjs/common";
import { ConfigurationModule } from "./configuration/configuration.module";
import { DatabaseModule } from "./database/database.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { RolesModule } from "./roles/roles.module";
import { RolesPermissionsModule } from "./roles-permissions/roles-permissions.module";
import { UsersModule } from "./users/users.module";
import { UsersRolesModule } from "./users-roles/users-roles.module";

@Module({
	imports: [
		ConfigurationModule,
		DatabaseModule,
		PermissionsModule,
		RolesModule,
		RolesPermissionsModule,
		UsersModule,
		UsersRolesModule,
	],
})
export class AppModule {}
