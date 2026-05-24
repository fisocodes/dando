import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
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

@Injectable()
export class CaslGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private caslAbilityFactory: CaslAbilityFactory,
	) {}

	canActivate(context: ExecutionContext): boolean {
		const subject = this.reflector.get<CaslSubject>(
			"casl_subject",
			context.getClass(),
		);

		if (!subject) return true;

		const request = context.switchToHttp().getRequest();
		const user: CaslUser = request.user;

		if (!user) throw new UnauthorizedException();

		const action = methodActionMap[request.method];
		const ability = this.caslAbilityFactory.createForUser(user);

		return ability.can(action, subject);
	}
}
