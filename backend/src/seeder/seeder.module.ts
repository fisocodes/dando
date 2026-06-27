import { Module } from "@nestjs/common";
import { ConfigurationModule } from "../configuration/configuration.module";
import { PermissionsModule } from "../permissions/permissions.module";
import { RolesModule } from "../roles/roles.module";
import { RolesPermissionsModule } from "../roles-permissions/roles-permissions.module";
import { UsersModule } from "../users/users.module";
import { UsersRolesModule } from "../users-roles/users-roles.module";
import { SeederService } from "./seeder.service";

@Module({
	imports: [
		ConfigurationModule,
		UsersModule,
		RolesModule,
		PermissionsModule,
		RolesPermissionsModule,
		UsersRolesModule,
	],
	providers: [SeederService],
})
export class SeederModule {}
