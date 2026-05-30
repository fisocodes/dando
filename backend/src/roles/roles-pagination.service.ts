import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Like, Repository } from "typeorm";
import { PaginationService } from "../common/services/pagination.service";
import { RolesResponseDto } from "./dtos/roles-response.dto";
import { Role } from "./roles.entity";

@Injectable()
export class RolesPaginationService extends PaginationService<
	Role,
	RolesResponseDto
> {
	constructor(
		@InjectRepository(Role)
		repository: Repository<Role>,
	) {
		super(repository, RolesResponseDto);
	}

	protected buildSearchFilter(
		search: string,
	): FindOptionsWhere<Role> | FindOptionsWhere<Role>[] {
		return [
			{ name: Like(`%${search}%`) },
			{ description: Like(`%${search}%`) },
		];
	}
}
