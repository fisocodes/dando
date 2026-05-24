import { MongoQuery } from "@casl/ability";

export interface CaslPermission {
	action: string;
	subject: string;
	inverted?: boolean;
	conditions?: MongoQuery<unknown>;
}
