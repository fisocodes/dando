import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CaslGuard } from "../../common/casl/casl.guard";
import { CaslSubject } from "../../common/casl/constants/casl-subject.constant";
import { CursorPaginationResponseDto } from "../../common/dtos/cursor-pagination-response.dto";
import { OffsetPaginationResponseDto } from "../../common/dtos/offset-pagination-response.dto";
import { UsersRolesCursorQueryDto } from "../dtos/users-roles-cursor-pagination-query.dto";
import { UsersRolesOffsetQueryDto } from "../dtos/users-roles-offset-pagination-query.dto";
import { UsersRolesResponseDto } from "../dtos/users-roles-response.dto";
import { UsersRolesPaginationService } from "../services/users-roles-pagination.service";

@ApiTags("UsersRoles")
@ApiBearerAuth()
@UseGuards(CaslGuard(CaslSubject.USERS_ROLES))
@Controller("users-roles")
export class UsersRolesPaginationController {
	constructor(
		private readonly paginationService: UsersRolesPaginationService,
	) {}

	@Get("offset")
	findWithOffset(
		@Query() query: UsersRolesOffsetQueryDto,
	): Promise<OffsetPaginationResponseDto<UsersRolesResponseDto>> {
		return this.paginationService.findWithOffset(query);
	}

	@Get("cursor")
	findWithCursor(
		@Query() query: UsersRolesCursorQueryDto,
	): Promise<CursorPaginationResponseDto<UsersRolesResponseDto>> {
		return this.paginationService.findWithCursor(query);
	}
}
