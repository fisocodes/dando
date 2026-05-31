import {
	CanActivate,
	ExecutionContext,
	Injectable,
	Type,
	UnauthorizedException,
} from "@nestjs/common";
import { CaslAbilityFactory } from "./casl-ability.factory";
import { CaslAction } from "./constants/casl-action.constant";
import { CaslSubject } from "./constants/casl-subject.constant";
import { CaslUser } from "./interfaces/casl-user.interface";

const methodActionMap: Record<string, CaslAction> = {
	GET: CaslAction.READ,
	POST: CaslAction.CREATE,
	PATCH: CaslAction.UPDATE,
	DELETE: CaslAction.DELETE,
};

export function CaslGuard(subject: CaslSubject): Type<CanActivate> {
	@Injectable()
	class Guard implements CanActivate {
		constructor(private caslAbilityFactory: CaslAbilityFactory) {}

		canActivate(context: ExecutionContext): boolean {
			const request = context.switchToHttp().getRequest();
			const user: CaslUser = request.user;
			if (!user) throw new UnauthorizedException();
			const action = methodActionMap[request.method];
			const ability = this.caslAbilityFactory.createForUser(user);
			return ability.can(action, subject);
		}
	}

	return Guard;
}
