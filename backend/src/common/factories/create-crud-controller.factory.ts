import {
	Body,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	SetMetadata,
} from "@nestjs/common";
import { CaslSubject } from "../casl/constants/casl-subject.constant";
import { BaseResponseDto } from "../dtos/base-response.dto";
import type { BaseEntity } from "../entities/base.entity";
import type { CrudService } from "../services/crud.service";

export function createCrudController<
	T extends BaseEntity,
	CreateDto,
	UpdateDto,
	ResponseDto extends BaseResponseDto,
>(subject: CaslSubject) {
	@SetMetadata("casl_subject", subject)
	abstract class CrudController {
		constructor(
			readonly service: CrudService<T, CreateDto, UpdateDto, ResponseDto>,
		) {}

		@Post()
		async create(@Body() dto: CreateDto): Promise<ResponseDto> {
			const [responseDto] = await this.service.create([dto]);
			return responseDto;
		}

		@Get(":id")
		async read(@Param("id", ParseUUIDPipe) id: string): Promise<ResponseDto> {
			const [responseDto] = await this.service.readOrThrow([id]);
			return responseDto;
		}

		@Patch(":id")
		async update(
			@Param("id", ParseUUIDPipe) id: string,
			@Body() dto: UpdateDto,
		): Promise<ResponseDto> {
			const [responseDto] = await this.service.update([{ ...dto, id }]);
			return responseDto;
		}

		@Delete(":id")
		delete(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
			return this.service.delete([id]);
		}
	}

	return CrudController;
}
