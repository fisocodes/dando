import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QueryService } from "../../common/services/query.service";
import { Role } from "../roles.entity";

@Injectable()
export class RolesQueryService extends QueryService<Role> {
	constructor(
		@InjectRepository(Role)
		repository: Repository<Role>,
	) {
		super(repository);
	}
}
