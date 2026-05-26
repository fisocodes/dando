import { Controller } from "@nestjs/common";
import { CaslSubject } from "../common/casl/constants/casl-subject.constant";
import { createController } from "../common/factories/create-controller.factory";
import { PermissionsCreateDto } from "./dtos/permissions-create.dto";
import { PermissionsCursorQueryDto } from "./dtos/permissions-cursor-pagination-query.dto";
import { PermissionsOffsetQueryDto } from "./dtos/permissions-offset-pagination-query.dto";
import { PermissionsResponseDto } from "./dtos/permissions-response.dto";
import { PermissionsUpdateDto } from "./dtos/permissions-update.dto";
import { Permission } from "./permissions.entity";
import { PermissionsCrudService } from "./permissions-crud.service";
import { PermissionsPaginationService } from "./permissions-pagination.service";

@Controller("permissions")
export class PermissionsController extends createController<
	Permission,
	PermissionsCreateDto,
	PermissionsUpdateDto,
	PermissionsResponseDto,
	PermissionsOffsetQueryDto,
	PermissionsCursorQueryDto
>(
	PermissionsCreateDto,
	PermissionsUpdateDto,
	PermissionsResponseDto,
	PermissionsOffsetQueryDto,
	PermissionsCursorQueryDto,
	CaslSubject.PERMISSIONS,
) {
	constructor(
		crudService: PermissionsCrudService,
		paginationService: PermissionsPaginationService,
	) {
		super(crudService, paginationService);
	}
}
