import { createHmac, randomInt } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";
import { CrudService } from "../../common/services/crud.service";
import { ConfigurationService } from "../../configuration/configuration.service";
import { UsersQueryService } from "../../users/services/users-query.service";
import { OtpCreateDto } from "../dtos/otp-create.dto";
import { OtpResponseDto } from "../dtos/otp-response.dto";
import { OtpUpdateDto } from "../dtos/otp-update.dto";
import { Otp } from "../otp.entity";
import { OtpQueryService } from "./otp-query.service";

@Injectable()
export class OtpCrudService extends CrudService<
	Otp,
	OtpCreateDto,
	OtpUpdateDto,
	OtpResponseDto
> {
	constructor(
		@InjectRepository(Otp)
		repository: Repository<Otp>,
		queryService: OtpQueryService,
		private readonly usersQueryService: UsersQueryService,
		private readonly configurationService: ConfigurationService,
	) {
		super(repository, queryService, OtpResponseDto);
	}

	async create(dto: OtpCreateDto): Promise<OtpResponseDto> {
		const user = await this.usersQueryService.findOneByOrThrow({
			id: dto.userId,
		});

		const existing = await this.queryService.findManyBy({ userId: dto.userId });
		if (existing.length > 0) await this.repository.softRemove(existing);

		const { otpLength, otpAlphabet, otpTtlMs } = this.configurationService;
		const plainCode = Array.from(
			{ length: otpLength },
			() => otpAlphabet[randomInt(0, otpAlphabet.length)],
		).join("");
		const code = createHmac("sha256", user.secret)
			.update(plainCode)
			.digest("hex");
		const expiresAt = new Date(Date.now() + otpTtlMs);

		const entity = this.repository.create({
			userId: dto.userId,
			code,
			expiresAt,
		});
		const saved = await this.repository.save(entity);

		return plainToInstance(OtpResponseDto, saved);
	}

	async update(id: string, dto: OtpUpdateDto): Promise<OtpResponseDto> {
		const entity = await this.queryService.findOneByOrThrow({ id });
		const updated = this.repository.merge(entity, dto);
		const saved = await this.repository.save(updated);
		return this.toResponse(saved);
	}
}
