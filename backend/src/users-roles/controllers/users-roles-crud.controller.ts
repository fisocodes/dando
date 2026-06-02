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
import { UsersRolesCreateDto } from "../dtos/users-roles-create.dto";
import { UsersRolesResponseDto } from "../dtos/users-roles-response.dto";
import { UsersRolesUpdateDto } from "../dtos/users-roles-update.dto";
import { UsersRolesCrudService } from "../services/users-roles-crud.service";

@ApiTags("UsersRoles")
@ApiBearerAuth()
@UseGuards(CaslGuard(CaslSubject.USERS_ROLES))
@Controller("users-roles")
export class UsersRolesCrudController {
	constructor(private readonly crudService: UsersRolesCrudService) {}

	@Post()
	create(@Body() dto: UsersRolesCreateDto): Promise<UsersRolesResponseDto> {
		return this.crudService.create(dto);
	}

	@Get(":id")
	read(@Param("id", ParseUUIDPipe) id: string): Promise<UsersRolesResponseDto> {
		return this.crudService.read(id);
	}

	@Patch(":id")
	update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() dto: UsersRolesUpdateDto,
	): Promise<UsersRolesResponseDto> {
		return this.crudService.update(id, dto);
	}

	@Delete(":id")
	delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
		return this.crudService.delete(id);
	}
}
