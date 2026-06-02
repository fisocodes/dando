import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QueryService } from "../../common/services/query.service";
import { UserRole } from "../users-roles.entity";

@Injectable()
export class UsersRolesQueryService extends QueryService<UserRole> {
	constructor(
		@InjectRepository(UserRole)
		repository: Repository<UserRole>,
	) {
		super(repository);
	}
}
