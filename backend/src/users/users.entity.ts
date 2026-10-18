import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity";

@Entity("users")
export class User extends BaseEntity {
	@Index({ unique: true })
	@Column()
	email: string;
}
