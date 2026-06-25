import { createHmac } from "node:crypto";
import { faker } from "@faker-js/faker";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CaslAction } from "../common/casl/constants/casl-action.constant";
import { CaslSubject } from "../common/casl/constants/casl-subject.constant";
import type { MailerService } from "../mailer/services/mailer.service";
import { Otp } from "../otp/otp.entity";
import type { OtpCrudService } from "../otp/services/otp-crud.service";
import type { OtpQueryService } from "../otp/services/otp-query.service";
import { Permission } from "../permissions/permissions.entity";
import type { PermissionsQueryService } from "../permissions/services/permissions-query.service";
import { Role } from "../roles/roles.entity";
import type { RolesQueryService } from "../roles/services/roles-query.service";
import { RolePermission } from "../roles-permissions/roles-permissions.entity";
import type { RolesPermissionsQueryService } from "../roles-permissions/services/roles-permissions-query.service";
import type { UsersQueryService } from "../users/services/users-query.service";
import type { User } from "../users/users.entity";
import type { UsersRolesQueryService } from "../users-roles/services/users-roles-query.service";
import { UserRole } from "../users-roles/users-roles.entity";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
	let service: AuthService;
	let usersQueryService: jest.Mocked<
		Pick<UsersQueryService, "findOneByOrThrow">
	>;
	let usersRolesQueryService: jest.Mocked<
		Pick<UsersRolesQueryService, "findManyBy">
	>;
	let rolesQueryService: jest.Mocked<Pick<RolesQueryService, "findManyBy">>;
	let rolesPermissionsQueryService: jest.Mocked<
		Pick<RolesPermissionsQueryService, "findManyBy">
	>;
	let permissionsQueryService: jest.Mocked<
		Pick<PermissionsQueryService, "findManyBy">
	>;
	let otpCrudService: jest.Mocked<Pick<OtpCrudService, "generate" | "delete">>;
	let otpQueryService: jest.Mocked<Pick<OtpQueryService, "findOneBy">>;
	let mailerService: jest.Mocked<Pick<MailerService, "send">>;
	let jwtService: jest.Mocked<Pick<JwtService, "sign">>;

	const userId = faker.string.uuid();
	const secret = "user-hmac-secret";
	const email = "user@example.com";

	const makeUser = (): User =>
		({
			id: userId,
			email,
			secret,
			createdAt: new Date(),
			updatedAt: new Date(),
		}) as User;

	beforeEach(() => {
		usersQueryService = { findOneByOrThrow: jest.fn() };
		usersRolesQueryService = { findManyBy: jest.fn() };
		rolesQueryService = { findManyBy: jest.fn() };
		rolesPermissionsQueryService = { findManyBy: jest.fn() };
		permissionsQueryService = { findManyBy: jest.fn() };
		otpCrudService = { generate: jest.fn(), delete: jest.fn() };
		otpQueryService = { findOneBy: jest.fn() };
		mailerService = { send: jest.fn() };
		jwtService = { sign: jest.fn() };

		service = new AuthService(
			usersQueryService as unknown as UsersQueryService,
			usersRolesQueryService as unknown as UsersRolesQueryService,
			rolesQueryService as unknown as RolesQueryService,
			rolesPermissionsQueryService as unknown as RolesPermissionsQueryService,
			permissionsQueryService as unknown as PermissionsQueryService,
			otpCrudService as unknown as OtpCrudService,
			otpQueryService as unknown as OtpQueryService,
			mailerService as unknown as MailerService,
			jwtService as unknown as JwtService,
		);
	});

	describe("requestOtp", () => {
		it("should generate an OTP and send it by email", async () => {
			usersQueryService.findOneByOrThrow.mockResolvedValue(makeUser());
			otpCrudService.generate.mockResolvedValue({
				plainCode: "ABC123",
				otp: {} as Otp,
			});
			mailerService.send.mockResolvedValue(undefined);

			await service.requestOtp(email);

			expect(usersQueryService.findOneByOrThrow).toHaveBeenCalledWith({
				email,
			});
			expect(otpCrudService.generate).toHaveBeenCalledWith(userId);
			expect(mailerService.send).toHaveBeenCalledWith(
				email,
				"Your login code",
				expect.stringContaining("ABC123"),
			);
		});

		it("should throw NotFoundException when user does not exist", async () => {
			usersQueryService.findOneByOrThrow.mockRejectedValue(
				new NotFoundException(),
			);
			await expect(service.requestOtp("unknown@example.com")).rejects.toThrow(
				NotFoundException,
			);
		});
	});

	describe("verifyOtp", () => {
		it("should return a JWT token when the OTP is valid and not expired", async () => {
			const user = makeUser();
			const plainCode = "ABC123";
			const hash = createHmac("sha256", secret).update(plainCode).digest("hex");
			const otp = {
				id: faker.string.uuid(),
				code: hash,
				expiresAt: new Date(Date.now() + 300_000),
			};

			usersQueryService.findOneByOrThrow.mockResolvedValue(user);
			otpQueryService.findOneBy.mockResolvedValue(otp as Otp);
			otpCrudService.delete.mockResolvedValue(undefined);
			jwtService.sign.mockReturnValue("jwt-token");

			const token = await service.verifyOtp(email, plainCode);

			expect(token).toBe("jwt-token");
			expect(otpCrudService.delete).toHaveBeenCalledWith(otp.id);
			expect(jwtService.sign).toHaveBeenCalledWith({ sub: userId }, { secret });
		});

		it("should throw UnauthorizedException when no OTP is found", async () => {
			usersQueryService.findOneByOrThrow.mockResolvedValue(makeUser());
			otpQueryService.findOneBy.mockResolvedValue(null);

			await expect(service.verifyOtp(email, "WRONG")).rejects.toThrow(
				UnauthorizedException,
			);
		});

		it("should throw UnauthorizedException when the OTP is expired", async () => {
			const user = makeUser();
			const plainCode = "ABC123";
			const hash = createHmac("sha256", secret).update(plainCode).digest("hex");
			const otp = {
				id: faker.string.uuid(),
				code: hash,
				expiresAt: new Date(Date.now() - 1000),
			};

			usersQueryService.findOneByOrThrow.mockResolvedValue(user);
			otpQueryService.findOneBy.mockResolvedValue(otp as Otp);

			await expect(service.verifyOtp(email, plainCode)).rejects.toThrow(
				UnauthorizedException,
			);
		});
	});

	describe("getMe", () => {
		it("should return user with empty roles when no roles are assigned", async () => {
			usersQueryService.findOneByOrThrow.mockResolvedValue(makeUser());
			usersRolesQueryService.findManyBy.mockResolvedValue([]);

			const result = await service.getMe(userId);

			expect(result.email).toBe(email);
			expect(result.roles).toEqual([]);
		});

		it("should return user with fully populated roles and permissions", async () => {
			const roleId = faker.string.uuid();
			const permissionId = faker.string.uuid();

			usersQueryService.findOneByOrThrow.mockResolvedValue(makeUser());
			usersRolesQueryService.findManyBy.mockResolvedValue([
				{ userId, roleId } as UserRole,
			]);
			rolesQueryService.findManyBy.mockResolvedValue([
				{
					id: roleId,
					name: "admin",
					description: "Admin",
					priority: 10,
				} as Role,
			]);
			rolesPermissionsQueryService.findManyBy.mockResolvedValue([
				{ roleId, permissionId } as RolePermission,
			]);
			permissionsQueryService.findManyBy.mockResolvedValue([
				{
					id: permissionId,
					action: CaslAction.READ,
					subject: CaslSubject.USERS,
					inverted: false,
				} as Permission,
			]);

			const result = await service.getMe(userId);

			expect(result.roles).toHaveLength(1);
			expect(result.roles[0].name).toBe("admin");
			expect(result.roles[0].permissions).toHaveLength(1);
			expect(result.roles[0].permissions[0].action).toBe(CaslAction.READ);
		});
	});
});
