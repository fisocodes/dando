import { CaslRole } from "./casl-role.interface";

export interface CaslUser {
	id: string;
	roles: CaslRole[];
}
