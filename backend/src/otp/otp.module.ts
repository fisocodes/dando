import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CaslModule } from "../common/casl/casl.module";
import { ConfigurationModule } from "../configuration/configuration.module";
import { UsersModule } from "../users/users.module";
import { OtpCrudController } from "./controllers/otp-crud.controller";
import { OtpPaginationController } from "./controllers/otp-pagination.controller";
import { Otp } from "./otp.entity";
import { OtpCrudService } from "./services/otp-crud.service";
import { OtpPaginationService } from "./services/otp-pagination.service";
import { OtpQueryService } from "./services/otp-query.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([Otp]),
		CaslModule,
		ConfigurationModule,
		UsersModule,
	],
	controllers: [OtpPaginationController, OtpCrudController],
	providers: [OtpCrudService, OtpPaginationService, OtpQueryService],
	exports: [OtpQueryService, OtpCrudService],
})
export class OtpModule {}
