import {
	ConflictException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, In, Repository } from "typeorm";
import { CaslAbilityFactory } from "../common/casl/casl-ability.factory";
import { CaslSubject } from "../common/casl/constants/casl-subject.constant";
import { CaslUser } from "../common/casl/interfaces/casl-user.interface";
import { CrudService } from "../common/services/crud.service";
import { RolesCreateDto } from "./dtos/roles-create.dto";
import { RolesResponseDto } from "./dtos/roles-response.dto";
import { RolesUpdateDto } from "./dtos/roles-update.dto";
import { Role } from "./roles.entity";

@Injectable()
export class RolesCrudService extends CrudService<
	Role,
	RolesCreateDto,
	RolesUpdateDto,
	RolesResponseDto
> {
	caslSubject: CaslSubject = CaslSubject.ROLES;

	constructor(
		@InjectRepository(Role)
		repository: Repository<Role>,
		dataSource: DataSource,
		caslAbilityFactory: CaslAbilityFactory,
	) {
		super(repository, dataSource, caslAbilityFactory, RolesResponseDto);
	}

	async create(dtos: RolesCreateDto[]): Promise<RolesResponseDto[]> {
		const roles = await this.dataSource.transaction(async (manager) => {
			const thereAreNameConflicts =
				(await manager.findBy(Role, { name: In(dtos.map((dto) => dto.name)) }))
					.length > 0;
			if (thereAreNameConflicts) throw new ConflictException();
			const entities = manager.create(Role, dtos);
			return manager.save(entities);
		});
		return roles.map((role) => this.toResponse(role));
	}

	async update(
		dtos: (RolesUpdateDto & { id: string })[],
		user?: CaslUser,
	): Promise<RolesResponseDto[]> {
		const { cannotUpdate } = this.abilitiesFor(user);
		const roles = await this.dataSource.transaction(async (manager) => {
			const entities = await manager.findBy(
				Role,
				dtos.map((dto) => ({ id: dto.id })),
			);

			if (entities.length !== dtos.length) throw new NotFoundException();

			for (const entity of entities) {
				if (cannotUpdate(entity)) throw new ForbiddenException();
			}

			const namesToUpdate = dtos
				.filter((dto) => dto.name)
				.map((dto) => dto.name) as string[];
			const existingEntities = await manager.findBy(Role, {
				name: In(namesToUpdate),
			});
			const thereAreNameConflicts =
				existingEntities.filter((r) => !dtos.find((dto) => dto.id === r.id))
					.length > 0;
			if (thereAreNameConflicts) throw new ConflictException();

			const updated = entities.map((entity) => {
				const dto = dtos.find((dto) => dto.id === entity.id);
				if (!dto) throw new NotFoundException();
				return manager.merge(Role, entity, dto);
			}) as Role[];
			return manager.save(updated);
		});
		return roles.map((role) => this.toResponse(role));
	}
}
