import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PaginationService } from "../../common/services/pagination.service";
import { UsersRolesResponseDto } from "../dtos/users-roles-response.dto";
import { UserRole } from "../users-roles.entity";

@Injectable()
export class UsersRolesPaginationService extends PaginationService<
	UserRole,
	UsersRolesResponseDto
> {
	constructor(
		@InjectRepository(UserRole)
		repository: Repository<UserRole>,
	) {
		super(repository, UsersRolesResponseDto);
	}
}
