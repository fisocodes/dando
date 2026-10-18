import {
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

export abstract class BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@CreateDateColumn({ precision: 3 })
	createdAt: Date;

	@UpdateDateColumn({ precision: 3 })
	updatedAt: Date;

	@DeleteDateColumn({ precision: 3 })
	deletedAt: Date | null;
}
