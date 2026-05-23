import {
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

export abstract class BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	readonly id!: string;

	@CreateDateColumn({ name: "created_at" })
	readonly createdAt!: Date;

	@UpdateDateColumn({ name: "updated_at" })
	readonly updatedAt!: Date;

	@DeleteDateColumn({ name: "deleted_at" })
	readonly deletedAt!: Date;
}
