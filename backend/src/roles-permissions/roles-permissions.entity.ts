import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity";
import { Permission } from "../permissions/permissions.entity";
import { Role } from "../roles/roles.entity";

@Entity("roles_permissions")
export class RolePermission extends BaseEntity {
	@ManyToOne(() => Role, { onDelete: "CASCADE" })
	@JoinColumn({ name: "role_id" })
	role!: Role;

	@Column({ name: "role_id" })
	roleId!: string;

	@ManyToOne(() => Permission, { onDelete: "CASCADE" })
	@JoinColumn({ name: "permission_id" })
	permission!: Permission;

	@Column({ name: "permission_id" })
	permissionId!: string;
}
