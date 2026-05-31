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
import { RolesCreateDto } from "../dtos/roles-create.dto";
import { RolesResponseDto } from "../dtos/roles-response.dto";
import { RolesUpdateDto } from "../dtos/roles-update.dto";
import { RolesCrudService } from "../services/roles-crud.service";

@ApiTags("Roles")
@ApiBearerAuth()
@UseGuards(CaslGuard(CaslSubject.ROLES))
@Controller("roles")
export class RolesCrudController {
	constructor(private readonly crudService: RolesCrudService) {}

	@Post()
	create(@Body() dto: RolesCreateDto): Promise<RolesResponseDto> {
		return this.crudService.create(dto);
	}

	@Get(":id")
	read(@Param("id", ParseUUIDPipe) id: string): Promise<RolesResponseDto> {
		return this.crudService.read(id);
	}

	@Patch(":id")
	update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() dto: RolesUpdateDto,
	): Promise<RolesResponseDto> {
		return this.crudService.update(id, dto);
	}

	@Delete(":id")
	delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
		return this.crudService.delete(id);
	}
}
