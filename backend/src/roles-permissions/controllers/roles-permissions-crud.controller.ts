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
import { RolesPermissionsCreateDto } from "../dtos/roles-permissions-create.dto";
import { RolesPermissionsResponseDto } from "../dtos/roles-permissions-response.dto";
import { RolesPermissionsUpdateDto } from "../dtos/roles-permissions-update.dto";
import { RolesPermissionsCrudService } from "../services/roles-permissions-crud.service";

@ApiTags("RolesPermissions")
@ApiBearerAuth()
@UseGuards(CaslGuard(CaslSubject.ROLES_PERMISSIONS))
@Controller("roles-permissions")
export class RolesPermissionsCrudController {
	constructor(private readonly crudService: RolesPermissionsCrudService) {}

	@Post()
	create(
		@Body() dto: RolesPermissionsCreateDto,
	): Promise<RolesPermissionsResponseDto> {
		return this.crudService.create(dto);
	}

	@Get(":id")
	read(
		@Param("id", ParseUUIDPipe) id: string,
	): Promise<RolesPermissionsResponseDto> {
		return this.crudService.read(id);
	}

	@Patch(":id")
	update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() dto: RolesPermissionsUpdateDto,
	): Promise<RolesPermissionsResponseDto> {
		return this.crudService.update(id, dto);
	}

	@Delete(":id")
	delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
		return this.crudService.delete(id);
	}
}
