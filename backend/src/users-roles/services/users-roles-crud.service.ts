import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { CrudService } from "../../common/services/crud.service";
import { UsersRolesCreateDto } from "../dtos/users-roles-create.dto";
import { UsersRolesResponseDto } from "../dtos/users-roles-response.dto";
import { UsersRolesUpdateDto } from "../dtos/users-roles-update.dto";
import { UserRole } from "../users-roles.entity";
import { UsersRolesQueryService } from "./users-roles-query.service";

@Injectable()
export class UsersRolesCrudService extends CrudService<
	UserRole,
	UsersRolesCreateDto,
	UsersRolesUpdateDto,
	UsersRolesResponseDto
> {
	constructor(
		@InjectRepository(UserRole)
		repository: Repository<UserRole>,
		queryService: UsersRolesQueryService,
	) {
		super(repository, queryService, UsersRolesResponseDto);
	}

	async create(dto: UsersRolesCreateDto): Promise<UsersRolesResponseDto> {
		await this.queryService.throwIfConflictsWith({
			userId: dto.userId,
			roleId: dto.roleId,
		});
		const entity = this.repository.create(dto);
		const saved = await this.repository.save(entity);
		return this.toResponse(saved);
	}

	async update(
		id: string,
		dto: UsersRolesUpdateDto,
	): Promise<UsersRolesResponseDto> {
		const entity = await this.queryService.findOneByOrThrow({ id });
		if (dto.userId || dto.roleId) {
			await this.queryService.throwIfConflictsWith({
				id: Not(id),
				userId: dto.userId ?? entity.userId,
				roleId: dto.roleId ?? entity.roleId,
			});
		}
		const updated = this.repository.merge(entity, dto);
		const saved = await this.repository.save(updated);
		return this.toResponse(saved);
	}
}
