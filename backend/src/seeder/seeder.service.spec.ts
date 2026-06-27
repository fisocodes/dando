import { faker } from "@faker-js/faker";
import { CaslAction } from "../common/casl/constants/casl-action.constant";
import { CaslSubject } from "../common/casl/constants/casl-subject.constant";
import type { ConfigurationService } from "../configuration/configuration.service";
import type { PermissionsResponseDto } from "../permissions/dtos/permissions-response.dto";
import type { Permission } from "../permissions/permissions.entity";
import type { PermissionsCrudService } from "../permissions/services/permissions-crud.service";
import type { PermissionsQueryService } from "../permissions/services/permissions-query.service";
import type { RolesResponseDto } from "../roles/dtos/roles-response.dto";
import type { Role } from "../roles/roles.entity";
import type { RolesCrudService } from "../roles/services/roles-crud.service";
import type { RolesQueryService } from "../roles/services/roles-query.service";
import type { RolesPermissionsResponseDto } from "../roles-permissions/dtos/roles-permissions-response.dto";
import type { RolePermission } from "../roles-permissions/roles-permissions.entity";
import type { RolesPermissionsCrudService } from "../roles-permissions/services/roles-permissions-crud.service";
import type { RolesPermissionsQueryService } from "../roles-permissions/services/roles-permissions-query.service";
import type { UsersResponseDto } from "../users/dtos/users-response.dto";
import type { UsersCrudService } from "../users/services/users-crud.service";
import type { UsersQueryService } from "../users/services/users-query.service";
import type { User } from "../users/users.entity";
import type { UsersRolesResponseDto } from "../users-roles/dtos/users-roles-response.dto";
import type { UsersRolesCrudService } from "../users-roles/services/users-roles-crud.service";
import type { UsersRolesQueryService } from "../users-roles/services/users-roles-query.service";
import type { UserRole } from "../users-roles/users-roles.entity";
import { SeederService } from "./seeder.service";

describe("SeedService", () => {
	let service: SeederService;

	let configurationService: { adminEmail: string };
	let usersCrudService: jest.Mocked<Pick<UsersCrudService, "create">>;
	let usersQueryService: jest.Mocked<Pick<UsersQueryService, "findOneBy">>;
	let rolesCrudService: jest.Mocked<Pick<RolesCrudService, "create">>;
	let rolesQueryService: jest.Mocked<Pick<RolesQueryService, "findOneBy">>;
	let permissionsCrudService: jest.Mocked<
		Pick<PermissionsCrudService, "create">
	>;
	let permissionsQueryService: jest.Mocked<
		Pick<PermissionsQueryService, "findOneBy">
	>;
	let rolesPermissionsCrudService: jest.Mocked<
		Pick<RolesPermissionsCrudService, "create">
	>;
	let rolesPermissionsQueryService: jest.Mocked<
		Pick<RolesPermissionsQueryService, "findOneBy">
	>;
	let usersRolesCrudService: jest.Mocked<Pick<UsersRolesCrudService, "create">>;
	let usersRolesQueryService: jest.Mocked<
		Pick<UsersRolesQueryService, "findOneBy">
	>;

	const adminEmail = "admin@example.com";
	const userId = faker.string.uuid();
	const roleId = faker.string.uuid();

	const makeUsersResponse = (): UsersResponseDto =>
		({
			id: userId,
			email: adminEmail,
			createdAt: new Date(),
			updatedAt: new Date(),
		}) as UsersResponseDto;

	const makeRolesResponse = (): RolesResponseDto =>
		({
			id: roleId,
			name: "administrator",
			priority: 999,
			createdAt: new Date(),
			updatedAt: new Date(),
		}) as RolesResponseDto;

	const makePermissionsResponse = (
		subject: CaslSubject,
	): PermissionsResponseDto =>
		({
			id: faker.string.uuid(),
			action: CaslAction.MANAGE,
			subject,
			inverted: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		}) as PermissionsResponseDto;

	beforeEach(() => {
		configurationService = { adminEmail };
		usersCrudService = { create: jest.fn() };
		usersQueryService = { findOneBy: jest.fn() };
		rolesCrudService = { create: jest.fn() };
		rolesQueryService = { findOneBy: jest.fn() };
		permissionsCrudService = { create: jest.fn() };
		permissionsQueryService = { findOneBy: jest.fn() };
		rolesPermissionsCrudService = { create: jest.fn() };
		rolesPermissionsQueryService = { findOneBy: jest.fn() };
		usersRolesCrudService = { create: jest.fn() };
		usersRolesQueryService = { findOneBy: jest.fn() };

		service = new SeederService(
			configurationService as unknown as ConfigurationService,
			usersCrudService as unknown as UsersCrudService,
			usersQueryService as unknown as UsersQueryService,
			rolesCrudService as unknown as RolesCrudService,
			rolesQueryService as unknown as RolesQueryService,
			permissionsCrudService as unknown as PermissionsCrudService,
			permissionsQueryService as unknown as PermissionsQueryService,
			rolesPermissionsCrudService as unknown as RolesPermissionsCrudService,
			rolesPermissionsQueryService as unknown as RolesPermissionsQueryService,
			usersRolesCrudService as unknown as UsersRolesCrudService,
			usersRolesQueryService as unknown as UsersRolesQueryService,
		);

		// Default: nothing exists yet
		usersQueryService.findOneBy.mockResolvedValue(null);
		rolesQueryService.findOneBy.mockResolvedValue(null);
		permissionsQueryService.findOneBy.mockResolvedValue(null);
		rolesPermissionsQueryService.findOneBy.mockResolvedValue(null);
		usersRolesQueryService.findOneBy.mockResolvedValue(null);

		usersCrudService.create.mockResolvedValue(makeUsersResponse());
		rolesCrudService.create.mockResolvedValue(makeRolesResponse());
		permissionsCrudService.create.mockImplementation(async (dto) =>
			makePermissionsResponse(dto.subject as CaslSubject),
		);
		rolesPermissionsCrudService.create.mockResolvedValue(
			{} as unknown as RolesPermissionsResponseDto,
		);
		usersRolesCrudService.create.mockResolvedValue(
			{} as unknown as UsersRolesResponseDto,
		);
	});

	describe("onApplicationBootstrap", () => {
		it("should create admin user, role, all permissions and link them on first run", async () => {
			await service.onApplicationBootstrap();

			expect(usersCrudService.create).toHaveBeenCalledWith({
				email: adminEmail,
			});
			expect(rolesCrudService.create).toHaveBeenCalledWith({
				name: "administrator",
				priority: 999,
			});
			expect(permissionsCrudService.create).toHaveBeenCalledTimes(
				Object.values(CaslSubject).length,
			);
			for (const subject of Object.values(CaslSubject)) {
				expect(permissionsCrudService.create).toHaveBeenCalledWith({
					action: CaslAction.MANAGE,
					subject,
					inverted: false,
				});
			}
			expect(usersRolesCrudService.create).toHaveBeenCalledWith({
				userId,
				roleId,
			});
		});

		it("should skip creating admin user if it already exists", async () => {
			usersQueryService.findOneBy.mockResolvedValue({
				id: userId,
				email: adminEmail,
			} as unknown as User);

			await service.onApplicationBootstrap();

			expect(usersCrudService.create).not.toHaveBeenCalled();
		});

		it("should skip creating admin role if it already exists", async () => {
			rolesQueryService.findOneBy.mockResolvedValue({
				id: roleId,
				name: "administrator",
			} as unknown as Role);

			await service.onApplicationBootstrap();

			expect(rolesCrudService.create).not.toHaveBeenCalled();
		});

		it("should skip creating a permission if it already exists", async () => {
			const permId = faker.string.uuid();
			permissionsQueryService.findOneBy.mockResolvedValue({
				id: permId,
				action: CaslAction.MANAGE,
			} as unknown as Permission);

			await service.onApplicationBootstrap();

			expect(permissionsCrudService.create).not.toHaveBeenCalled();
		});

		it("should skip linking a role-permission that already exists", async () => {
			rolesPermissionsQueryService.findOneBy.mockResolvedValue({
				id: faker.string.uuid(),
			} as unknown as RolePermission);
			permissionsQueryService.findOneBy.mockResolvedValue({
				id: faker.string.uuid(),
				action: CaslAction.MANAGE,
			} as unknown as Permission);

			await service.onApplicationBootstrap();

			expect(rolesPermissionsCrudService.create).not.toHaveBeenCalled();
		});

		it("should skip assigning the role to the user if already assigned", async () => {
			usersRolesQueryService.findOneBy.mockResolvedValue({
				id: faker.string.uuid(),
			} as unknown as UserRole);

			await service.onApplicationBootstrap();

			expect(usersRolesCrudService.create).not.toHaveBeenCalled();
		});

		it("should be fully idempotent when all resources already exist", async () => {
			const permId = faker.string.uuid();
			usersQueryService.findOneBy.mockResolvedValue({
				id: userId,
			} as unknown as User);
			rolesQueryService.findOneBy.mockResolvedValue({
				id: roleId,
			} as unknown as Role);
			permissionsQueryService.findOneBy.mockResolvedValue({
				id: permId,
			} as unknown as Permission);
			rolesPermissionsQueryService.findOneBy.mockResolvedValue({
				id: faker.string.uuid(),
			} as unknown as RolePermission);
			usersRolesQueryService.findOneBy.mockResolvedValue({
				id: faker.string.uuid(),
			} as unknown as UserRole);

			await service.onApplicationBootstrap();

			expect(usersCrudService.create).not.toHaveBeenCalled();
			expect(rolesCrudService.create).not.toHaveBeenCalled();
			expect(permissionsCrudService.create).not.toHaveBeenCalled();
			expect(rolesPermissionsCrudService.create).not.toHaveBeenCalled();
			expect(usersRolesCrudService.create).not.toHaveBeenCalled();
		});
	});
});
