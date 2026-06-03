import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CaslGuard } from "../../common/casl/casl.guard";
import { CaslSubject } from "../../common/casl/constants/casl-subject.constant";
import { OtpCreateDto } from "../dtos/otp-create.dto";
import { OtpResponseDto } from "../dtos/otp-response.dto";
import { OtpUpdateDto } from "../dtos/otp-update.dto";
import { OtpCrudService } from "../services/otp-crud.service";

@ApiTags("Otps")
@ApiBearerAuth()
@UseGuards(CaslGuard(CaslSubject.OTPS))
@Controller("otps")
export class OtpCrudController {
	constructor(private readonly crudService: OtpCrudService) {}

	@Post()
	create(@Body() dto: OtpCreateDto): Promise<OtpResponseDto> {
		return this.crudService.create(dto);
	}

	@Get(":id")
	read(@Param("id", ParseUUIDPipe) id: string): Promise<OtpResponseDto> {
		return this.crudService.read(id);
	}

	@Patch(":id")
	update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() dto: OtpUpdateDto,
	): Promise<OtpResponseDto> {
		return this.crudService.update(id, dto);
	}

	@Delete(":id")
	delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
		return this.crudService.delete(id);
	}
}
