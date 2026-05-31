import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CrudService } from "../../common/services/crud.service";
import { PermissionsCreateDto } from "../dtos/permissions-create.dto";
import { PermissionsResponseDto } from "../dtos/permissions-response.dto";
import { PermissionsUpdateDto } from "../dtos/permissions-update.dto";
import { Permission } from "../permissions.entity";
import { PermissionsQueryService } from "./permissions-query.service";

@Injectable()
export class PermissionsCrudService extends CrudService<
	Permission,
	PermissionsCreateDto,
	PermissionsUpdateDto,
	PermissionsResponseDto
> {
	constructor(
		@InjectRepository(Permission)
		repository: Repository<Permission>,
		queryService: PermissionsQueryService,
	) {
		super(repository, queryService, PermissionsResponseDto);
	}

	async create(dto: PermissionsCreateDto): Promise<PermissionsResponseDto> {
		const entity = this.repository.create(dto);
		const saved = await this.repository.save(entity);
		return this.toResponse(saved);
	}

	async update(
		id: string,
		dto: PermissionsUpdateDto,
	): Promise<PermissionsResponseDto> {
		const entity = await this.queryService.findOneByOrThrow({ id });
		const updated = this.repository.merge(entity, dto);
		const saved = await this.repository.save(updated);
		return this.toResponse(saved);
	}
}
