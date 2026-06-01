import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PaginationService } from "../../common/services/pagination.service";
import { RolesPermissionsResponseDto } from "../dtos/roles-permissions-response.dto";
import { RolePermission } from "../roles-permissions.entity";

@Injectable()
export class RolesPermissionsPaginationService extends PaginationService<
	RolePermission,
	RolesPermissionsResponseDto
> {
	constructor(
		@InjectRepository(RolePermission)
		repository: Repository<RolePermission>,
	) {
		super(repository, RolesPermissionsResponseDto);
	}
}
