import { IsEmail, IsOptional } from "class-validator";
import { OffsetPaginationQueryDto } from "../../common/dtos/offset-pagination-query.dto";

export class UsersOffsetPaginationQueryDto extends OffsetPaginationQueryDto {
	@IsOptional()
	@IsEmail()
	email?: string;
}
