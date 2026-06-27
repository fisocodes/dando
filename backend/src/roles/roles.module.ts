import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CaslModule } from "../common/casl/casl.module";
import { RolesCrudController } from "./controllers/roles-crud.controller";
import { RolesPaginationController } from "./controllers/roles-pagination.controller";
import { Role } from "./roles.entity";
import { RolesCrudService } from "./services/roles-crud.service";
import { RolesPaginationService } from "./services/roles-pagination.service";
import { RolesQueryService } from "./services/roles-query.service";

@Module({
	imports: [TypeOrmModule.forFeature([Role]), CaslModule],
	controllers: [RolesPaginationController, RolesCrudController],
	providers: [RolesCrudService, RolesPaginationService, RolesQueryService],
	exports: [RolesQueryService, RolesCrudService],
})
export class RolesModule {}
