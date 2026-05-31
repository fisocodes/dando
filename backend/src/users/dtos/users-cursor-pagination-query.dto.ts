import { IsEmail, IsOptional } from "class-validator";
import { CursorPaginationQueryDto } from "../../common/dtos/cursor-pagination-query.dto";

export class UsersCursorPaginationQueryDto extends CursorPaginationQueryDto {
	@IsOptional()
	@IsEmail()
	email?: string;
}
