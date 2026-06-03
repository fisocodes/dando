import { Module } from "@nestjs/common";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigurationModule } from "../configuration/configuration.module";
import { ConfigurationService } from "../configuration/configuration.service";
import { MailerModule } from "../mailer/mailer.module";
import { OtpModule } from "../otp/otp.module";
import { PermissionsModule } from "../permissions/permissions.module";
import { RolesModule } from "../roles/roles.module";
import { RolesPermissionsModule } from "../roles-permissions/roles-permissions.module";
import { UsersModule } from "../users/users.module";
import { UsersRolesModule } from "../users-roles/users-roles.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtGuard } from "./jwt.guard";

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigurationModule],
			useFactory: (config: ConfigurationService): JwtModuleOptions => ({
				signOptions: { expiresIn: config.jwtExpiry as never },
			}),
			inject: [ConfigurationService],
		}),
		ConfigurationModule,
		UsersModule,
		UsersRolesModule,
		RolesModule,
		RolesPermissionsModule,
		PermissionsModule,
		OtpModule,
		MailerModule,
	],
	controllers: [AuthController],
	providers: [AuthService, JwtGuard],
	exports: [JwtGuard],
})
export class AuthModule {}
