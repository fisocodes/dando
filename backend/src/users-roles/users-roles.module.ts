import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CaslModule } from "../common/casl/casl.module";
import { UsersRolesCrudController } from "./controllers/users-roles-crud.controller";
import { UsersRolesPaginationController } from "./controllers/users-roles-pagination.controller";
import { UsersRolesCrudService } from "./services/users-roles-crud.service";
import { UsersRolesPaginationService } from "./services/users-roles-pagination.service";
import { UsersRolesQueryService } from "./services/users-roles-query.service";
import { UserRole } from "./users-roles.entity";

@Module({
	imports: [TypeOrmModule.forFeature([UserRole]), CaslModule],
	controllers: [UsersRolesPaginationController, UsersRolesCrudController],
	providers: [
		UsersRolesCrudService,
		UsersRolesPaginationService,
		UsersRolesQueryService,
	],
	exports: [UsersRolesQueryService],
})
export class UsersRolesModule {}
