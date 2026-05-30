import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CaslModule } from "../common/casl/casl.module";
import { RolesController } from "./roles.controller";
import { Role } from "./roles.entity";
import { RolesCrudService } from "./roles-crud.service";
import { RolesPaginationService } from "./roles-pagination.service";

@Module({
	imports: [TypeOrmModule.forFeature([Role]), CaslModule],
	controllers: [RolesController],
	providers: [RolesCrudService, RolesPaginationService],
	exports: [RolesCrudService],
})
export class RolesModule {}
