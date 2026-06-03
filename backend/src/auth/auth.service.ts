import { createHmac } from "node:crypto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { In } from "typeorm";
import { MailerService } from "../mailer/services/mailer.service";
import { OtpCrudService } from "../otp/services/otp-crud.service";
import { OtpQueryService } from "../otp/services/otp-query.service";
import { PermissionsQueryService } from "../permissions/services/permissions-query.service";
import { RolesQueryService } from "../roles/services/roles-query.service";
import { RolesPermissionsQueryService } from "../roles-permissions/services/roles-permissions-query.service";
import { UsersQueryService } from "../users/services/users-query.service";
import { UsersRolesQueryService } from "../users-roles/services/users-roles-query.service";
import { MeResponseDto } from "./dtos/me-response.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersQueryService: UsersQueryService,
		private readonly usersRolesQueryService: UsersRolesQueryService,
		private readonly rolesQueryService: RolesQueryService,
		private readonly rolesPermissionsQueryService: RolesPermissionsQueryService,
		private readonly permissionsQueryService: PermissionsQueryService,
		private readonly otpCrudService: OtpCrudService,
		private readonly otpQueryService: OtpQueryService,
		private readonly mailerService: MailerService,
		private readonly jwtService: JwtService,
	) {}

	async requestOtp(email: string): Promise<void> {
		const user = await this.usersQueryService.findOneByOrThrow({ email });
		const { plainCode } = await this.otpCrudService.generate(user.id);

		const html = `<p>Your login code is: <strong>${plainCode}</strong></p>`;
		await this.mailerService.send(user.email, "Your login code", html);
	}

	async verifyOtp(email: string, code: string): Promise<string> {
		const user = await this.usersQueryService.findOneByOrThrow({ email });

		const hash = createHmac("sha256", user.secret).update(code).digest("hex");
		const otp = await this.otpQueryService.findOneBy({
			userId: user.id,
			code: hash,
		});

		if (!otp || otp.expiresAt < new Date()) throw new UnauthorizedException();

		await this.otpCrudService.delete(otp.id);

		return this.jwtService.sign({ sub: user.id }, { secret: user.secret });
	}

	async getMe(userId: string): Promise<MeResponseDto> {
		const user = await this.usersQueryService.findOneByOrThrow({ id: userId });

		const userRoles = await this.usersRolesQueryService.findManyBy({ userId });

		if (userRoles.length === 0) {
			return {
				id: user.id,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
				roles: [],
			};
		}

		const roleIds = userRoles.map((ur) => ur.roleId);
		const [roles, rolePermissions] = await Promise.all([
			this.rolesQueryService.findManyBy({ id: In(roleIds) }),
			this.rolesPermissionsQueryService.findManyBy({
				roleId: In(roleIds),
			}),
		]);

		const permissionIds = [
			...new Set(rolePermissions.map((rp) => rp.permissionId)),
		];
		const permissions =
			permissionIds.length > 0
				? await this.permissionsQueryService.findManyBy({
						id: In(permissionIds),
					})
				: [];

		const rolesWithPermissions = roles.map((role) => ({
			id: role.id,
			name: role.name,
			description: role.description,
			priority: role.priority,
			permissions: rolePermissions
				.filter((rp) => rp.roleId === role.id)
				.map((rp) => permissions.find((p) => p.id === rp.permissionId))
				.filter((p) => p !== undefined)
				.map((p) => ({
					id: p.id,
					action: p.action,
					subject: p.subject,
					inverted: p.inverted,
					conditions: p.conditions,
				})),
		}));

		return {
			id: user.id,
			email: user.email,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			roles: rolesWithPermissions,
		};
	}
}
