import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNoContentResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
} from "@nestjs/swagger";
import { CrudController } from "../common/controllers/crud.controller";
import { UsersCreateDto } from "./dto/users-create.dto";
import { UsersCrudResponseDto } from "./dto/users-crud-response.dto";
import { UsersUpdateDto } from "./dto/users-update.dto";
import { User } from "./users.entity";
import { UsersCrudService } from "./users-crud.service";

@ApiTags("users")
@ApiBadRequestResponse()
@Controller("users")
export class UsersCrudController extends CrudController<
	User,
	UsersCreateDto,
	UsersUpdateDto,
	UsersCrudResponseDto
> {
	constructor(crudService: UsersCrudService) {
		super(crudService);
	}

	@Post()
	@ApiCreatedResponse({ type: UsersCrudResponseDto })
	@ApiConflictResponse()
	create(@Body() dto: UsersCreateDto): Promise<UsersCrudResponseDto> {
		return this.crudService.create(dto);
	}

	@Get(":id")
	@ApiOkResponse({ type: UsersCrudResponseDto })
	@ApiNotFoundResponse()
	read(@Param("id", ParseUUIDPipe) id: string): Promise<UsersCrudResponseDto> {
		return this.crudService.read(id);
	}

	@Patch(":id")
	@ApiOkResponse({ type: UsersCrudResponseDto })
	@ApiNotFoundResponse()
	@ApiConflictResponse()
	update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() dto: UsersUpdateDto,
	): Promise<UsersCrudResponseDto> {
		return this.crudService.update(id, dto);
	}

	@Delete(":id")
	@HttpCode(204)
	@ApiNoContentResponse()
	@ApiNotFoundResponse()
	delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
		return this.crudService.delete(id);
	}
}
