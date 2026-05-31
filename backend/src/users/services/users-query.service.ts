import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QueryService } from "../../common/services/query.service";
import { User } from "../users.entity";

@Injectable()
export class UsersQueryService extends QueryService<User> {
	constructor(
		@InjectRepository(User)
		repository: Repository<User>,
	) {
		super(repository);
	}
}
