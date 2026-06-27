import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CaslModule } from "../common/casl/casl.module";
import { UsersCrudController } from "./controllers/users-crud.controller";
import { UsersPaginationController } from "./controllers/users-pagination.controller";
import { UsersCrudService } from "./services/users-crud.service";
import { UsersPaginationService } from "./services/users-pagination.service";
import { UsersQueryService } from "./services/users-query.service";
import { User } from "./users.entity";

@Module({
	imports: [TypeOrmModule.forFeature([User]), CaslModule],
	controllers: [UsersPaginationController, UsersCrudController],
	providers: [UsersPaginationService, UsersCrudService, UsersQueryService],
	exports: [UsersQueryService, UsersCrudService],
})
export class UsersModule {}
