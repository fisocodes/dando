import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { UsersCrudController } from "./users-crud.controller";
import { UsersCrudService } from "./users-crud.service";

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UsersCrudController],
	providers: [UsersCrudService],
})
export class UsersModule {}
