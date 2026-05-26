import { MongoQuery } from "@casl/ability";
import { CaslAction } from "../constants/casl-action.constant";
import { CaslSubject } from "../constants/casl-subject.constant";

export interface CaslPermission {
	action: CaslAction;
	subject: CaslSubject;
	inverted?: boolean;
	conditions?: MongoQuery<unknown>;
}
