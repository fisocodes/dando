import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRolesPermissionsTable1780274551309
	implements MigrationInterface
{
	name = "CreateRolesPermissionsTable1780274551309";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "roles_permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "role_id" uuid NOT NULL, "permission_id" uuid NOT NULL, CONSTRAINT "PK_roles_permissions" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_roles_permissions_role_id" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_roles_permissions_permission_id" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "UQ_roles_permissions_active" ON "roles_permissions" ("role_id", "permission_id") WHERE "deleted_at" IS NULL`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "UQ_roles_permissions_active"`);
		await queryRunner.query(
			`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_roles_permissions_permission_id"`,
		);
		await queryRunner.query(
			`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_roles_permissions_role_id"`,
		);
		await queryRunner.query(`DROP TABLE "roles_permissions"`);
	}
}
