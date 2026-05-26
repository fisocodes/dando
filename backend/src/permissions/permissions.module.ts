import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CaslModule } from "../common/casl/casl.module";
import { PermissionsController } from "./permissions.controller";
import { Permission } from "./permissions.entity";
import { PermissionsCrudService } from "./permissions-crud.service";
import { PermissionsPaginationService } from "./permissions-pagination.service";

@Module({
	imports: [TypeOrmModule.forFeature([Permission]), CaslModule],
	controllers: [PermissionsController],
	providers: [PermissionsCrudService, PermissionsPaginationService],
	exports: [PermissionsCrudService],
})
export class PermissionsModule {}
