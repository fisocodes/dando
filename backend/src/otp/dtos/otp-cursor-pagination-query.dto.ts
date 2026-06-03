import { IsOptional, IsUUID } from "class-validator";
import { CursorPaginationQueryDto } from "../../common/dtos/cursor-pagination-query.dto";

export class OtpCursorQueryDto extends CursorPaginationQueryDto {
	@IsOptional()
	@IsUUID()
	userId?: string;
}
