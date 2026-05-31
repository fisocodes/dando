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
import { UsersCreateDto } from "../dtos/users-create.dto";
import { UsersResponseDto } from "../dtos/users-response.dto";
import { UsersUpdateDto } from "../dtos/users-update.dto";
import { UsersCrudService } from "../services/users-crud.service";

@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(CaslGuard(CaslSubject.USERS))
@Controller("users")
export class UsersCrudController {
	constructor(private readonly crudService: UsersCrudService) {}

	@Post()
	create(@Body() dto: UsersCreateDto): Promise<UsersResponseDto> {
		return this.crudService.create(dto);
	}

	@Get(":id")
	read(@Param("id", ParseUUIDPipe) id: string): Promise<UsersResponseDto> {
		return this.crudService.read(id);
	}

	@Patch(":id")
	update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() dto: UsersUpdateDto,
	): Promise<UsersResponseDto> {
		return this.crudService.update(id, dto);
	}

	@Delete(":id")
	delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
		return this.crudService.delete(id);
	}
}
