import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QueryService } from "../../common/services/query.service";
import { RolePermission } from "../roles-permissions.entity";

@Injectable()
export class RolesPermissionsQueryService extends QueryService<RolePermission> {
	constructor(
		@InjectRepository(RolePermission)
		repository: Repository<RolePermission>,
	) {
		super(repository);
	}
}
