import { BaseEntity } from "../entities/base.entity";
import { CrudService } from "../services/crud.service";

export abstract class CrudController<
	T extends BaseEntity,
	CreateDto,
	UpdateDto,
> {
	constructor(
		protected readonly crudService: CrudService<T, CreateDto, UpdateDto>,
	) {}

	abstract create(dto: CreateDto): Promise<T>;

	abstract read(id: string): Promise<T>;

	abstract update(id: string, dto: UpdateDto): Promise<T>;

	abstract delete(id: string): Promise<void>;
}
