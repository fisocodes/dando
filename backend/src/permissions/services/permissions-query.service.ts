import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QueryService } from "../../common/services/query.service";
import { Permission } from "../permissions.entity";

@Injectable()
export class PermissionsQueryService extends QueryService<Permission> {
	constructor(
		@InjectRepository(Permission)
		repository: Repository<Permission>,
	) {
		super(repository);
	}
}
