import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { CrudService } from "../../common/services/crud.service";
import { RolesCreateDto } from "../dtos/roles-create.dto";
import { RolesResponseDto } from "../dtos/roles-response.dto";
import { RolesUpdateDto } from "../dtos/roles-update.dto";
import { Role } from "../roles.entity";
import { RolesQueryService } from "./roles-query.service";

@Injectable()
export class RolesCrudService extends CrudService<
	Role,
	RolesCreateDto,
	RolesUpdateDto,
	RolesResponseDto
> {
	constructor(
		@InjectRepository(Role)
		repository: Repository<Role>,
		queryService: RolesQueryService,
	) {
		super(repository, queryService, RolesResponseDto);
	}

	async create(dto: RolesCreateDto): Promise<RolesResponseDto> {
		await this.queryService.throwIfConflictsWith({ name: dto.name });
		const entity = this.repository.create(dto);
		const saved = await this.repository.save(entity);
		return this.toResponse(saved);
	}

	async update(id: string, dto: RolesUpdateDto): Promise<RolesResponseDto> {
		const entity = await this.queryService.findOneByOrThrow({ id });
		if (dto.name) {
			await this.queryService.throwIfConflictsWith({
				id: Not(id),
				name: dto.name,
			});
		}
		const updated = this.repository.merge(entity, dto);
		const saved = await this.repository.save(updated);
		return this.toResponse(saved);
	}
}
