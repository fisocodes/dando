import { faker } from "@faker-js/faker";
import { type ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { UsersQueryService } from "../users/services/users-query.service";
import type { User } from "../users/users.entity";
import { JwtGuard } from "./jwt.guard";

interface MockRequest {
	headers: { authorization?: string };
	cookies: { access_token?: string };
	user?: { id: string; roles: unknown[] };
}

const makeContext = (request: MockRequest): ExecutionContext =>
	({
		switchToHttp: () => ({ getRequest: () => request }),
	}) as unknown as ExecutionContext;

describe("JwtGuard", () => {
	let guard: JwtGuard;
	let jwtService: jest.Mocked<Pick<JwtService, "decode" | "verify">>;
	let usersQueryService: jest.Mocked<
		Pick<UsersQueryService, "findOneByOrThrow">
	>;

	const userId = faker.string.uuid();
	const makeUser = (): User =>
		({
			id: userId,
			email: "user@example.com",
			secret: "user-secret",
			createdAt: new Date(),
			updatedAt: new Date(),
		}) as User;

	beforeEach(() => {
		jwtService = { decode: jest.fn(), verify: jest.fn() };
		usersQueryService = { findOneByOrThrow: jest.fn() };
		guard = new JwtGuard(
			jwtService as unknown as JwtService,
			usersQueryService as unknown as UsersQueryService,
		);
	});

	it("should return true and attach user for a valid Bearer token", async () => {
		const user = makeUser();
		const request: MockRequest = {
			headers: { authorization: "Bearer valid-token" },
			cookies: {},
		};
		jwtService.decode.mockReturnValue({ sub: userId });
		usersQueryService.findOneByOrThrow.mockResolvedValue(user);
		jwtService.verify.mockReturnValue({ sub: userId });

		const result = await guard.canActivate(makeContext(request));

		expect(result).toBe(true);
		expect(request.user).toEqual({ id: userId, roles: [] });
	});

	it("should accept a token from the access_token cookie", async () => {
		const user = makeUser();
		const request: MockRequest = {
			headers: {},
			cookies: { access_token: "cookie-token" },
		};
		jwtService.decode.mockReturnValue({ sub: userId });
		usersQueryService.findOneByOrThrow.mockResolvedValue(user);
		jwtService.verify.mockReturnValue({ sub: userId });

		expect(await guard.canActivate(makeContext(request))).toBe(true);
	});

	it("should throw UnauthorizedException when no token is present", async () => {
		const request: MockRequest = { headers: {}, cookies: {} };
		await expect(guard.canActivate(makeContext(request))).rejects.toThrow(
			UnauthorizedException,
		);
	});

	it("should throw UnauthorizedException when token payload has no sub", async () => {
		const request: MockRequest = {
			headers: { authorization: "Bearer bad-token" },
			cookies: {},
		};
		jwtService.decode.mockReturnValue({ sub: null });
		await expect(guard.canActivate(makeContext(request))).rejects.toThrow(
			UnauthorizedException,
		);
	});

	it("should throw UnauthorizedException when user is not found", async () => {
		const request: MockRequest = {
			headers: { authorization: "Bearer valid-token" },
			cookies: {},
		};
		jwtService.decode.mockReturnValue({ sub: userId });
		usersQueryService.findOneByOrThrow.mockRejectedValue(
			new Error("not found"),
		);
		await expect(guard.canActivate(makeContext(request))).rejects.toThrow(
			UnauthorizedException,
		);
	});

	it("should throw UnauthorizedException when token verification fails", async () => {
		const user = makeUser();
		const request: MockRequest = {
			headers: { authorization: "Bearer tampered" },
			cookies: {},
		};
		jwtService.decode.mockReturnValue({ sub: userId });
		usersQueryService.findOneByOrThrow.mockResolvedValue(user);
		jwtService.verify.mockImplementation(() => {
			throw new Error("invalid signature");
		});
		await expect(guard.canActivate(makeContext(request))).rejects.toThrow(
			UnauthorizedException,
		);
	});
});
