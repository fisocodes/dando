import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { UsersQueryService } from "../users/services/users-query.service";

@Injectable()
export class JwtGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly usersQueryService: UsersQueryService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractToken(request);
		if (!token) throw new UnauthorizedException();

		try {
			const decoded = this.jwtService.decode(token);
			if (!decoded?.sub) throw new UnauthorizedException();

			const user = await this.usersQueryService.findOneByOrThrow({
				id: decoded.sub,
			});
			this.jwtService.verify(token, { secret: user.secret });

			request.user = {
				id: user.id,
				roles: [],
			};
			return true;
		} catch {
			throw new UnauthorizedException();
		}
	}

	private extractToken(request: Request): string | null {
		const [type, token] = request.headers.authorization?.split(" ") ?? [];
		if (type === "Bearer" && token) return token;
		return (request.cookies?.access_token as string) ?? null;
	}
}
