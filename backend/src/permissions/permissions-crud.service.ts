import { subject } from "@casl/ability";
import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { DataSource, Repository } from "typeorm";
import { CaslAbilityFactory } from "../common/casl/casl-ability.factory";
import { CaslAction } from "../common/casl/constants/casl-action.constant";
import { CaslSubject } from "../common/casl/constants/casl-subject.constant";
import { CaslUser } from "../common/casl/interfaces/casl-user.interface";
import { CrudService } from "../common/services/crud.service";
import { PermissionsCreateDto } from "./dtos/permissions-create.dto";
import { PermissionsResponseDto } from "./dtos/permissions-response.dto";
import { PermissionsUpdateDto } from "./dtos/permissions-update.dto";
import { Permission } from "./permissions.entity";

@Injectable()
export class PermissionsCrudService extends CrudService<
	Permission,
	PermissionsCreateDto,
	PermissionsUpdateDto,
	PermissionsResponseDto
> {
	caslSubject: CaslSubject = CaslSubject.PERMISSIONS;

	constructor(
		@InjectRepository(Permission)
		repository: Repository<Permission>,
		dataSource: DataSource,
		caslAbilityFactory: CaslAbilityFactory,
	) {
		super(repository, dataSource, caslAbilityFactory, PermissionsResponseDto);
	}

	async create(
		dtos: PermissionsCreateDto[],
	): Promise<PermissionsResponseDto[]> {
		const permissions = await this.withTransaction(async (queryRunner) => {
			const entities = queryRunner.manager.create(Permission, dtos);
			return queryRunner.manager.save(entities);
		});
		return permissions.map((permission) => this.toResponse(permission));
	}

	async update(
		dtos: Array<PermissionsUpdateDto & { id: string }>,
		user?: CaslUser,
	): Promise<PermissionsResponseDto[]> {
		const permissions = await this.withTransaction(async (queryRunner) => {
			const entities = await queryRunner.manager.findBy(
				Permission,
				dtos.map((dto) => ({ id: dto.id })),
			);
			if (entities.length !== dtos.length) throw new NotFoundException();

			if (user) {
				const ability = this.caslAbilityFactory.createForUser(user);
				for (const entity of entities) {
					if (
						!ability.can(
							CaslAction.UPDATE,
							subject(CaslSubject.PERMISSIONS, entity),
						)
					)
						throw new ForbiddenException();
				}
			}

			const updated = entities.map((entity) => {
				const dto = dtos.find((dto) => dto.id === entity.id);
				if (!dto) throw new NotFoundException();
				return queryRunner.manager.merge(Permission, entity, dto);
			});
			return queryRunner.manager.save(updated);
		});
		return permissions.map((permission) => this.toResponse(permission));
	}

	toResponse(entity: Permission): PermissionsResponseDto {
		return plainToInstance(PermissionsResponseDto, entity);
	}
}
