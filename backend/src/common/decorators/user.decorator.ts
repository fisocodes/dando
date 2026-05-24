import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { CaslUser } from "../casl/interfaces/casl-user.interface";

export const User = createParamDecorator(
	(_data: unknown, ctx: ExecutionContext): CaslUser | undefined => {
		const request = ctx.switchToHttp().getRequest();
		return request.user;
	},
);
