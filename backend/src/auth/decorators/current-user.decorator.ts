import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
	(_data: unknown, ctx: ExecutionContext): { id: string } => {
		return ctx.switchToHttp().getRequest().user;
	},
);
