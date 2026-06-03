import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSecretToUsersTable1780513291161 implements MigrationInterface {
	name = "AddSecretToUsersTable1780513291161";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" ADD "secret" uuid NOT NULL DEFAULT uuid_generate_v4()`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "UQ_users_secret" UNIQUE ("secret")`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "UQ_users_secret"`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "secret"`);
	}
}
