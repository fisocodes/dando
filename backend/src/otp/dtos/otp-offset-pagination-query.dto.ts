import { IsOptional, IsUUID } from "class-validator";
import { OffsetPaginationQueryDto } from "../../common/dtos/offset-pagination-query.dto";

export class OtpOffsetQueryDto extends OffsetPaginationQueryDto {
	@IsOptional()
	@IsUUID()
	userId?: string;
}
