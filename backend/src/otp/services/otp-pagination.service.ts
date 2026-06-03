import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PaginationService } from "../../common/services/pagination.service";
import { OtpResponseDto } from "../dtos/otp-response.dto";
import { Otp } from "../otp.entity";

@Injectable()
export class OtpPaginationService extends PaginationService<
	Otp,
	OtpResponseDto
> {
	constructor(
		@InjectRepository(Otp)
		repository: Repository<Otp>,
	) {
		super(repository, OtpResponseDto);
	}
}
