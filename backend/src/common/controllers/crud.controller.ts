import { CrudResponseDto } from "../dto/crud-response.dto";
import { BaseEntity } from "../entities/base.entity";
import { CrudService } from "../services/crud.service";

export abstract class CrudController<
	T extends BaseEntity,
	CreateDto,
	UpdateDto,
	ResponseDto extends CrudResponseDto,
> {
	constructor(
		protected readonly crudService: CrudService<
			T,
			CreateDto,
			UpdateDto,
			ResponseDto
		>,
	) {}

	abstract create(dto: CreateDto): Promise<ResponseDto>;

	abstract read(id: string): Promise<ResponseDto>;

	abstract update(id: string, dto: UpdateDto): Promise<ResponseDto>;

	abstract delete(id: string): Promise<void>;
}
