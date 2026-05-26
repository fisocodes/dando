import { IsBoolean, IsIn, IsOptional } from "class-validator";
import { CaslAction } from "../../common/casl/constants/casl-action.constant";
import { CaslSubject } from "../../common/casl/constants/casl-subject.constant";
import { OffsetPaginationQueryDto } from "../../common/dtos/offset-pagination-query.dto";

export class PermissionsOffsetQueryDto extends OffsetPaginationQueryDto {
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
