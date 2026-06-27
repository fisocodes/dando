import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { CaslAction } from "../common/casl/constants/casl-action.constant";
import { CaslSubject } from "../common/casl/constants/casl-subject.constant";
import { ConfigurationService } from "../configuration/configuration.service";
import { PermissionsCrudService } from "../permissions/services/permissions-crud.service";
import { PermissionsQueryService } from "../permissions/services/permissions-query.service";
import { RolesCrudService } from "../roles/services/roles-crud.service";
import { RolesQueryService } from "../roles/services/roles-query.service";
import { RolesPermissionsCrudService } from "../roles-permissions/services/roles-permissions-crud.service";
import { RolesPermissionsQueryService } from "../roles-permissions/services/roles-permissions-query.service";
import { UsersCrudService } from "../users/services/users-crud.service";
import { UsersQueryService } from "../users/services/users-query.service";
import { UsersRolesCrudService } from "../users-roles/services/users-roles-crud.service";
import { UsersRolesQueryService } from "../users-roles/services/users-roles-query.service";

const ADMIN_ROLE_NAME = "administrator";
const ADMIN_ROLE_PRIORITY = 999;

@Injectable()
export class SeederService implements OnApplicationBootstrap {
	private readonly logger = new Logger(SeederService.name);

	constructor(
		private readonly configurationService: ConfigurationService,
		private readonly usersCrudService: UsersCrudService,
		private readonly usersQueryService: UsersQueryService,
		private readonly rolesCrudService: RolesCrudService,
		private readonly rolesQueryService: RolesQueryService,
		private readonly permissionsCrudService: PermissionsCrudService,
		private readonly permissionsQueryService: PermissionsQueryService,
		private readonly rolesPermissionsCrudService: RolesPermissionsCrudService,
		private readonly rolesPermissionsQueryService: RolesPermissionsQueryService,
		private readonly usersRolesCrudService: UsersRolesCrudService,
		private readonly usersRolesQueryService: UsersRolesQueryService,
	) {}

	async onApplicationBootstrap(): Promise<void> {
		this.logger.log("Seeding administrator...");

		const adminUserId = await this.ensureAdminUser();
		const adminRoleId = await this.ensureAdminRole();
		await this.ensureAdminPermissions(adminRoleId);
		await this.ensureAdminRoleAssigned(adminUserId, adminRoleId);

		this.logger.log("Administrator seed complete.");
	}

	private async ensureAdminUser(): Promise<string> {
		const email = this.configurationService.adminEmail;
		const existing = await this.usersQueryService.findOneBy({ email });

		if (existing) {
			this.logger.log(`Admin user already exists: ${email}`);
			return existing.id;
		}

		const created = await this.usersCrudService.create({ email });
		this.logger.log(`Admin user created: ${email}`);
		return created.id;
	}

	private async ensureAdminRole(): Promise<string> {
		const existing = await this.rolesQueryService.findOneBy({
			name: ADMIN_ROLE_NAME,
		});

		if (existing) {
			this.logger.log(`Admin role already exists: ${ADMIN_ROLE_NAME}`);
			return existing.id;
		}

		const created = await this.rolesCrudService.create({
			name: ADMIN_ROLE_NAME,
			priority: ADMIN_ROLE_PRIORITY,
		});
		this.logger.log(`Admin role created: ${ADMIN_ROLE_NAME}`);
		return created.id;
	}

	private async ensureAdminPermissions(roleId: string): Promise<void> {
		for (const subject of Object.values(CaslSubject)) {
			const permissionId = await this.ensurePermission(subject);
			await this.ensureRolePermission(roleId, permissionId);
		}
	}

	private async ensurePermission(subject: CaslSubject): Promise<string> {
		const existing = await this.permissionsQueryService.findOneBy({
			action: CaslAction.MANAGE,
			subject,
			inverted: false,
		});

		if (existing) return existing.id;

		const created = await this.permissionsCrudService.create({
			action: CaslAction.MANAGE,
			subject,
			inverted: false,
		});
		this.logger.log(`Permission created: manage ${subject}`);
		return created.id;
	}

	private async ensureRolePermission(
		roleId: string,
		permissionId: string,
	): Promise<void> {
		const existing = await this.rolesPermissionsQueryService.findOneBy({
			roleId,
			permissionId,
		});

		if (existing) return;

		await this.rolesPermissionsCrudService.create({ roleId, permissionId });
	}

	private async ensureAdminRoleAssigned(
		userId: string,
		roleId: string,
	): Promise<void> {
		const existing = await this.usersRolesQueryService.findOneBy({
			userId,
			roleId,
		});

		if (existing) {
			this.logger.log("Admin role already assigned to admin user.");
			return;
		}

		await this.usersRolesCrudService.create({ userId, roleId });
		this.logger.log("Admin role assigned to admin user.");
	}
}
