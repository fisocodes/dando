import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity";
import { User } from "../users/users.entity";

@Entity("otps")
export class Otp extends BaseEntity {
	@ManyToOne(() => User, { onDelete: "CASCADE" })
	@JoinColumn({ name: "user_id" })
	user!: User;

	@Column({ name: "user_id" })
	userId!: string;

	@Column()
	code!: string;

	@Column({ name: "expires_at" })
	expiresAt!: Date;
}
