import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity";
import { Role } from "../roles/roles.entity";
import { User } from "../users/users.entity";

@Entity("users_roles")
export class UserRole extends BaseEntity {
	@ManyToOne(() => User, { onDelete: "CASCADE" })
	@JoinColumn({ name: "user_id" })
	user!: User;

	@Column({ name: "user_id" })
	userId!: string;

	@ManyToOne(() => Role, { onDelete: "CASCADE" })
	@JoinColumn({ name: "role_id" })
	role!: Role;

	@Column({ name: "role_id" })
	roleId!: string;
}
