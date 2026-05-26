import { IsBoolean, IsIn, IsOptional } from "class-validator";
import { CaslAction } from "../../common/casl/constants/casl-action.constant";
import { CaslSubject } from "../../common/casl/constants/casl-subject.constant";
import { CursorPaginationQueryDto } from "../../common/dtos/cursor-pagination-query.dto";

export class PermissionsCursorQueryDto extends CursorPaginationQueryDto {
	@IsOptional()
	@IsIn(Object.values(CaslAction))
	action?: CaslAction;

	@IsOptional()
	@IsIn(Object.values(CaslSubject))
	subject?: CaslSubject;

	@IsOptional()
	@IsBoolean()
	inverted?: boolean;
}
