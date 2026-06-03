import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QueryService } from "../../common/services/query.service";
import { Otp } from "../otp.entity";

@Injectable()
export class OtpQueryService extends QueryService<Otp> {
	constructor(
		@InjectRepository(Otp)
		repository: Repository<Otp>,
	) {
		super(repository);
	}
}
