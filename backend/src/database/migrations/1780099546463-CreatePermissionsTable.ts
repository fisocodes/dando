import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePermissionsTable1780099546463 implements MigrationInterface {
	name = "CreatePermissionsTable1780099546463";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "action" character varying NOT NULL, "subject" character varying NOT NULL, "inverted" boolean NOT NULL DEFAULT false, "conditions" text, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "permissions"`);
	}
}
