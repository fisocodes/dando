import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CaslSubject } from "../common/casl/constants/casl-subject.constant";
import { createController } from "../common/factories/create-controller.factory";
import { RolesCreateDto } from "./dtos/roles-create.dto";
import { RolesCursorQueryDto } from "./dtos/roles-cursor-pagination-query.dto";
import { RolesOffsetQueryDto } from "./dtos/roles-offset-pagination-query.dto";
import { RolesResponseDto } from "./dtos/roles-response.dto";
import { RolesUpdateDto } from "./dtos/roles-update.dto";
import { Role } from "./roles.entity";
import { RolesCrudService } from "./roles-crud.service";
import { RolesPaginationService } from "./roles-pagination.service";

@ApiTags("roles")
@Controller("roles")
export class RolesController extends createController<
	Role,
	RolesCreateDto,
	RolesUpdateDto,
	RolesResponseDto,
	RolesOffsetQueryDto,
	RolesCursorQueryDto
>(
	RolesCreateDto,
	RolesUpdateDto,
	RolesResponseDto,
	RolesOffsetQueryDto,
	RolesCursorQueryDto,
	CaslSubject.ROLES,
) {
	constructor(
		crudService: RolesCrudService,
		paginationService: RolesPaginationService,
	) {
		super(crudService, paginationService);
	}
}
