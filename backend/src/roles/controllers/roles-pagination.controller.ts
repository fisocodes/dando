import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CaslGuard } from "../../common/casl/casl.guard";
import { CaslSubject } from "../../common/casl/constants/casl-subject.constant";
import { CursorPaginationResponseDto } from "../../common/dtos/cursor-pagination-response.dto";
import { OffsetPaginationResponseDto } from "../../common/dtos/offset-pagination-response.dto";
import { RolesCursorQueryDto } from "../dtos/roles-cursor-pagination-query.dto";
import { RolesOffsetQueryDto } from "../dtos/roles-offset-pagination-query.dto";
import { RolesResponseDto } from "../dtos/roles-response.dto";
import { RolesPaginationService } from "../services/roles-pagination.service";

@ApiTags("Roles")
@ApiBearerAuth()
@UseGuards(CaslGuard(CaslSubject.ROLES))
@Controller("roles")
export class RolesPaginationController {
	constructor(private readonly paginationService: RolesPaginationService) {}

	@Get("offset")
	findWithOffset(
		@Query() query: RolesOffsetQueryDto,
	): Promise<OffsetPaginationResponseDto<RolesResponseDto>> {
		return this.paginationService.findWithOffset(query);
	}

	@Get("cursor")
	findWithCursor(
		@Query() query: RolesCursorQueryDto,
	): Promise<CursorPaginationResponseDto<RolesResponseDto>> {
		return this.paginationService.findWithCursor(query);
	}
}
