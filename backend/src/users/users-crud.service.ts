import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CrudService } from "../common/services/crud.service";
import { UsersCreateDto } from "./dto/users-create.dto";
import { UsersCrudResponseDto } from "./dto/users-crud-response.dto";
import { UsersUpdateDto } from "./dto/users-update.dto";
import { User } from "./users.entity";

@Injectable()
export class UsersCrudService extends CrudService<
	User,
	UsersCreateDto,
	UsersUpdateDto,
	UsersCrudResponseDto
> {
	constructor(
		@InjectRepository(User)
		repository: Repository<User>,
	) {
		super(repository, UsersCrudResponseDto);
	}

	async create(dto: UsersCreateDto): Promise<UsersCrudResponseDto> {
		const existingUser = await this.repository.findOne({
			where: { email: dto.email },
			withDeleted: true,
		});

		if (existingUser) throw new ConflictException();

		const savedUser = await this.repository.save(this.repository.create(dto));
		return this.toResponse(savedUser);
	}

	async update(id: string, dto: UsersUpdateDto): Promise<UsersCrudResponseDto> {
		const userToUpdate = await this.findOrFail(id);

		if (dto.email && dto.email !== userToUpdate.email) {
			const existingUser = await this.repository.findOne({
				where: { email: dto.email },
				withDeleted: true,
			});
			if (existingUser) throw new ConflictException();
			userToUpdate.email = dto.email;
		}

		const savedUser = await this.repository.save(userToUpdate);
		return this.toResponse(savedUser);
	}
}
