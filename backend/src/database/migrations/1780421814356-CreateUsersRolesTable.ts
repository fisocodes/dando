import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersRolesTable1780421814356 implements MigrationInterface {
	name = "CreateUsersRolesTable1780421814356";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "users_roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "PK_users_roles" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_users_roles_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_users_roles_role_id" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "UQ_users_roles_active" ON "users_roles" ("user_id", "role_id") WHERE "deleted_at" IS NULL`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "UQ_users_roles_active"`);
		await queryRunner.query(
			`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_users_roles_role_id"`,
		);
		await queryRunner.query(
			`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_users_roles_user_id"`,
		);
		await queryRunner.query(`DROP TABLE "users_roles"`);
	}
}
