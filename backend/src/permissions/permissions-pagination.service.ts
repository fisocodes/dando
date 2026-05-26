import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";
import { PaginationService } from "../common/services/pagination.service";
import { PermissionsResponseDto } from "./dtos/permissions-response.dto";
import { Permission } from "./permissions.entity";

@Injectable()
export class PermissionsPaginationService extends PaginationService<
	Permission,
	PermissionsResponseDto
> {
	constructor(
		@InjectRepository(Permission)
		repository: Repository<Permission>,
	) {
		super(repository);
	}

	toResponse(entity: Permission): PermissionsResponseDto {
		return plainToInstance(PermissionsResponseDto, entity);
	}
}
