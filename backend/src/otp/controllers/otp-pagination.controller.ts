import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CaslGuard } from "../../common/casl/casl.guard";
import { CaslSubject } from "../../common/casl/constants/casl-subject.constant";
import { CursorPaginationResponseDto } from "../../common/dtos/cursor-pagination-response.dto";
import { OffsetPaginationResponseDto } from "../../common/dtos/offset-pagination-response.dto";
import { OtpCursorQueryDto } from "../dtos/otp-cursor-pagination-query.dto";
import { OtpOffsetQueryDto } from "../dtos/otp-offset-pagination-query.dto";
import { OtpResponseDto } from "../dtos/otp-response.dto";
import { OtpPaginationService } from "../services/otp-pagination.service";

@ApiTags("Otps")
@ApiBearerAuth()
@UseGuards(CaslGuard(CaslSubject.OTPS))
@Controller("otps")
export class OtpPaginationController {
	constructor(private readonly paginationService: OtpPaginationService) {}

	@Get("offset")
	findWithOffset(
		@Query() query: OtpOffsetQueryDto,
	): Promise<OffsetPaginationResponseDto<OtpResponseDto>> {
		return this.paginationService.findWithOffset(query);
	}

	@Get("cursor")
	findWithCursor(
		@Query() query: OtpCursorQueryDto,
	): Promise<CursorPaginationResponseDto<OtpResponseDto>> {
		return this.paginationService.findWithCursor(query);
	}
}
