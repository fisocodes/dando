import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ConfigurationModule } from "./configuration/configuration.module";
import { DatabaseModule } from "./database/database.module";
import { MailerModule } from "./mailer/mailer.module";
import { OtpModule } from "./otp/otp.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { RolesModule } from "./roles/roles.module";
import { RolesPermissionsModule } from "./roles-permissions/roles-permissions.module";
import { UsersModule } from "./users/users.module";
import { UsersRolesModule } from "./users-roles/users-roles.module";

@Module({
	imports: [
		ConfigurationModule,
		DatabaseModule,
		AuthModule,
		MailerModule,
		OtpModule,
		PermissionsModule,
		RolesModule,
		RolesPermissionsModule,
		UsersModule,
		UsersRolesModule,
	],
})
export class AppModule {}
