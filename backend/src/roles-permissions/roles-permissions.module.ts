import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CaslModule } from "../common/casl/casl.module";
import { RolesPermissionsCrudController } from "./controllers/roles-permissions-crud.controller";
import { RolesPermissionsPaginationController } from "./controllers/roles-permissions-pagination.controller";
import { RolePermission } from "./roles-permissions.entity";
import { RolesPermissionsCrudService } from "./services/roles-permissions-crud.service";
import { RolesPermissionsPaginationService } from "./services/roles-permissions-pagination.service";
import { RolesPermissionsQueryService } from "./services/roles-permissions-query.service";

@Module({
	imports: [TypeOrmModule.forFeature([RolePermission]), CaslModule],
	controllers: [
		RolesPermissionsPaginationController,
		RolesPermissionsCrudController,
	],
	providers: [
		RolesPermissionsCrudService,
		RolesPermissionsPaginationService,
		RolesPermissionsQueryService,
	],
	exports: [RolesPermissionsQueryService],
})
export class RolesPermissionsModule {}
