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
import { PermissionsCreateDto } from "../dtos/permissions-create.dto";
import { PermissionsResponseDto } from "../dtos/permissions-response.dto";
import { PermissionsUpdateDto } from "../dtos/permissions-update.dto";
import { PermissionsCrudService } from "../services/permissions-crud.service";

@ApiTags("Permissions")
@ApiBearerAuth()
@UseGuards(CaslGuard(CaslSubject.PERMISSIONS))
@Controller("permissions")
export class PermissionsCrudController {
	constructor(private readonly crudService: PermissionsCrudService) {}

	@Post()
	create(@Body() dto: PermissionsCreateDto): Promise<PermissionsResponseDto> {
		return this.crudService.create(dto);
	}

	@Get(":id")
	read(
		@Param("id", ParseUUIDPipe) id: string,
	): Promise<PermissionsResponseDto> {
		return this.crudService.read(id);
	}

	@Patch(":id")
	update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() dto: PermissionsUpdateDto,
	): Promise<PermissionsResponseDto> {
		return this.crudService.update(id, dto);
	}

	@Delete(":id")
	delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
		return this.crudService.delete(id);
	}
}
