import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CaslModule } from "../common/casl/casl.module";
import { PermissionsCrudController } from "./controllers/permissions-crud.controller";
import { PermissionsPaginationController } from "./controllers/permissions-pagination.controller";
import { Permission } from "./permissions.entity";
import { PermissionsCrudService } from "./services/permissions-crud.service";
import { PermissionsPaginationService } from "./services/permissions-pagination.service";
import { PermissionsQueryService } from "./services/permissions-query.service";

@Module({
	imports: [TypeOrmModule.forFeature([Permission]), CaslModule],
	controllers: [PermissionsPaginationController, PermissionsCrudController],
	providers: [
		PermissionsCrudService,
		PermissionsPaginationService,
		PermissionsQueryService,
	],
	exports: [PermissionsQueryService],
})
export class PermissionsModule {}
