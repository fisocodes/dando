import { randomUUID } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { CrudService } from "../../common/services/crud.service";
import { UsersCreateDto } from "../dtos/users-create.dto";
import { UsersResponseDto } from "../dtos/users-response.dto";
import { UsersUpdateDto } from "../dtos/users-update.dto";
import { User } from "../users.entity";
import { UsersQueryService } from "./users-query.service";

@Injectable()
export class UsersCrudService extends CrudService<
	User,
	UsersCreateDto,
	UsersUpdateDto,
	UsersResponseDto
> {
	constructor(
		@InjectRepository(User)
		repository: Repository<User>,
		queryService: UsersQueryService,
	) {
		super(repository, queryService, UsersResponseDto);
	}

	async create(dto: UsersCreateDto): Promise<UsersResponseDto> {
		await this.queryService.throwIfConflictsWith({ email: dto.email });
		const newEntity = this.repository.create({ ...dto, secret: randomUUID() });
		const savedEntity = await this.repository.save(newEntity);
		return this.toResponse(savedEntity);
	}

	async update(id: string, dto: UsersUpdateDto): Promise<UsersResponseDto> {
		const foundEntity = await this.queryService.findOneByOrThrow({ id });
		if (dto.email) {
			await this.queryService.throwIfConflictsWith({
				id: Not(id),
				email: dto.email,
			});
		}
		const updatedEntity = this.repository.merge(foundEntity, dto);
		const savedEntity = await this.repository.save(updatedEntity);
		return this.toResponse(savedEntity);
	}
}
