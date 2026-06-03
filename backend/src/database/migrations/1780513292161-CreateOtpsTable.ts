import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOtpsTable1780513292161 implements MigrationInterface {
	name = "CreateOtpsTable1780513292161";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "otps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "code" character varying NOT NULL, "expires_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_otps" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "otps" ADD CONSTRAINT "FK_otps_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "otps" DROP CONSTRAINT "FK_otps_user_id"`,
		);
		await queryRunner.query(`DROP TABLE "otps"`);
	}
}
