import {
	AbilityBuilder,
	createMongoAbility,
	ForcedSubject,
	MongoAbility,
	MongoQuery,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { CaslAction } from "./constants/casl-action.constant";
import { CaslSubject } from "./constants/casl-subject.constant";
import { CaslUser } from "./interfaces/casl-user.interface";

export type CaslAbility = MongoAbility<
	[CaslAction, CaslSubject | ForcedSubject<CaslSubject>],
	MongoQuery<unknown>
>;

@Injectable()
export class CaslAbilityFactory {
	createForUser(user: CaslUser) {
		const { can, cannot, build } = new AbilityBuilder<CaslAbility>(
			createMongoAbility,
		);

		for (const role of user.roles) {
			for (const permission of role.permissions) {
				if (permission.inverted) {
					cannot(
						permission.action as CaslAction,
						permission.subject as CaslSubject,
						permission.conditions,
					);
				} else {
					can(
						permission.action as CaslAction,
						permission.subject as CaslSubject,
						permission.conditions,
					);
				}
			}
		}

		return build();
	}
}
