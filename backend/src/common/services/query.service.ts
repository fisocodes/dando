import { ConflictException, NotFoundException } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { BaseEntity } from "../entities/base.entity";

export abstract class QueryService<T extends BaseEntity> {
	constructor(protected readonly repository: Repository<T>) {}

	findOneBy(where: FindOptionsWhere<T>): Promise<T | null> {
		return this.repository.findOneBy(where);
	}

	async findOneByOrThrow(where: FindOptionsWhere<T>): Promise<T> {
		const entity = await this.repository.findOneBy(where);
		if (!entity) throw new NotFoundException();
		return entity;
	}

	findManyBy(where: FindOptionsWhere<T>): Promise<T[]> {
		return this.repository.findBy(where);
	}

	async throwIfConflictsWith(where: FindOptionsWhere<T>): Promise<void> {
		const exists = await this.repository.findOneBy(where);
		if (exists) throw new ConflictException();
	}
}
