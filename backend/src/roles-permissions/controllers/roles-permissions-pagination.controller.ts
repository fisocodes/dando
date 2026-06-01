import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CaslGuard } from "../../common/casl/casl.guard";
import { CaslSubject } from "../../common/casl/constants/casl-subject.constant";
import { CursorPaginationResponseDto } from "../../common/dtos/cursor-pagination-response.dto";
import { OffsetPaginationResponseDto } from "../../common/dtos/offset-pagination-response.dto";
import { RolesPermissionsCursorQueryDto } from "../dtos/roles-permissions-cursor-pagination-query.dto";
import { RolesPermissionsOffsetQueryDto } from "../dtos/roles-permissions-offset-pagination-query.dto";
import { RolesPermissionsResponseDto } from "../dtos/roles-permissions-response.dto";
import { RolesPermissionsPaginationService } from "../services/roles-permissions-pagination.service";

@ApiTags("RolesPermissions")
@ApiBearerAuth()
@UseGuards(CaslGuard(CaslSubject.ROLES_PERMISSIONS))
@Controller("roles-permissions")
export class RolesPermissionsPaginationController {
	constructor(
		private readonly paginationService: RolesPermissionsPaginationService,
	) {}

	@Get("offset")
	findWithOffset(
		@Query() query: RolesPermissionsOffsetQueryDto,
	): Promise<OffsetPaginationResponseDto<RolesPermissionsResponseDto>> {
		return this.paginationService.findWithOffset(query);
	}

	@Get("cursor")
	findWithCursor(
		@Query() query: RolesPermissionsCursorQueryDto,
	): Promise<CursorPaginationResponseDto<RolesPermissionsResponseDto>> {
		return this.paginationService.findWithCursor(query);
	}
}
