import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CaslGuard } from "../../common/casl/casl.guard";
import { CaslSubject } from "../../common/casl/constants/casl-subject.constant";
import { CursorPaginationResponseDto } from "../../common/dtos/cursor-pagination-response.dto";
import { OffsetPaginationResponseDto } from "../../common/dtos/offset-pagination-response.dto";
import { PermissionsCursorQueryDto } from "../dtos/permissions-cursor-pagination-query.dto";
import { PermissionsOffsetQueryDto } from "../dtos/permissions-offset-pagination-query.dto";
import { PermissionsResponseDto } from "../dtos/permissions-response.dto";
import { PermissionsPaginationService } from "../services/permissions-pagination.service";

@ApiTags("Permissions")
@ApiBearerAuth()
@UseGuards(CaslGuard(CaslSubject.PERMISSIONS))
@Controller("permissions")
export class PermissionsPaginationController {
	constructor(
		private readonly paginationService: PermissionsPaginationService,
	) {}

	@Get("offset")
	findWithOffset(
		@Query() query: PermissionsOffsetQueryDto,
	): Promise<OffsetPaginationResponseDto<PermissionsResponseDto>> {
		return this.paginationService.findWithOffset(query);
	}

	@Get("cursor")
	findWithCursor(
		@Query() query: PermissionsCursorQueryDto,
	): Promise<CursorPaginationResponseDto<PermissionsResponseDto>> {
		return this.paginationService.findWithCursor(query);
	}
}
