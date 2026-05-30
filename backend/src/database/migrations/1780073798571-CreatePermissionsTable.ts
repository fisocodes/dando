import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePermissionsTable1780073798571 implements MigrationInterface {
	name = "CreatePermissionsTable1780073798571";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "action" character varying NOT NULL, "subject" character varying NOT NULL, "inverted" boolean NOT NULL DEFAULT false, "conditions" text, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "permission"`);
	}
}
