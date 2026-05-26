import { MongoQuery } from "@casl/ability";
import { IsBoolean, IsIn, IsObject, IsOptional } from "class-validator";
import { CaslAction } from "../../common/casl/constants/casl-action.constant";
import { CaslSubject } from "../../common/casl/constants/casl-subject.constant";

export class PermissionsCreateDto {
	@IsIn(Object.values(CaslAction))
	action!: CaslAction;

	@IsIn(Object.values(CaslSubject))
	subject!: CaslSubject;

	@IsBoolean()
	@IsOptional()
	inverted: boolean = false;

	@IsObject()
	@IsOptional()
	consditions?: MongoQuery<unknown>;
}
