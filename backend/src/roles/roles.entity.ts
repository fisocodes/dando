import { Column, Entity } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity";

@Entity()
export class Role extends BaseEntity {
	@Column({ unique: true })
	name!: string;

	@Column({ nullable: true })
	description?: string;

	@Column({ default: 0 })
	priority!: number;
}
