import { MongoQuery } from "@casl/ability";
import { CaslAction } from "../../common/casl/constants/casl-action.constant";
import { CaslSubject } from "../../common/casl/constants/casl-subject.constant";
import { BaseResponseDto } from "../../common/dtos/base-response.dto";

export class PermissionsResponseDto extends BaseResponseDto {
	action!: CaslAction;
	subject!: CaslSubject;
	inverted!: boolean;
	conditions?: MongoQuery<unknown>;
}
