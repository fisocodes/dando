import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { CrudService } from "../../common/services/crud.service";
import { RolesPermissionsCreateDto } from "../dtos/roles-permissions-create.dto";
import { RolesPermissionsResponseDto } from "../dtos/roles-permissions-response.dto";
import { RolesPermissionsUpdateDto } from "../dtos/roles-permissions-update.dto";
import { RolePermission } from "../roles-permissions.entity";
import { RolesPermissionsQueryService } from "./roles-permissions-query.service";

@Injectable()
export class RolesPermissionsCrudService extends CrudService<
	RolePermission,
	RolesPermissionsCreateDto,
	RolesPermissionsUpdateDto,
	RolesPermissionsResponseDto
> {
	constructor(
		@InjectRepository(RolePermission)
		repository: Repository<RolePermission>,
		queryService: RolesPermissionsQueryService,
	) {
		super(repository, queryService, RolesPermissionsResponseDto);
	}

	async create(
		dto: RolesPermissionsCreateDto,
	): Promise<RolesPermissionsResponseDto> {
		await this.queryService.throwIfConflictsWith({
			roleId: dto.roleId,
			permissionId: dto.permissionId,
		});
		const entity = this.repository.create(dto);
		const saved = await this.repository.save(entity);
		return this.toResponse(saved);
	}

	async update(
		id: string,
		dto: RolesPermissionsUpdateDto,
	): Promise<RolesPermissionsResponseDto> {
		const entity = await this.queryService.findOneByOrThrow({ id });
		if (dto.roleId || dto.permissionId) {
			await this.queryService.throwIfConflictsWith({
				id: Not(id),
				roleId: dto.roleId ?? entity.roleId,
				permissionId: dto.permissionId ?? entity.permissionId,
			});
		}
		const updated = this.repository.merge(entity, dto);
		const saved = await this.repository.save(updated);
		return this.toResponse(saved);
	}
}
