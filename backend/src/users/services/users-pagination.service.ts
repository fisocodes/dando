import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PaginationService } from "../../common/services/pagination.service";
import { UsersResponseDto } from "../dtos/users-response.dto";
import { User } from "../users.entity";

@Injectable()
export class UsersPaginationService extends PaginationService<
	User,
	UsersResponseDto
> {
	constructor(
		@InjectRepository(User)
		repository: Repository<User>,
	) {
		super(repository, UsersResponseDto);
	}
}
