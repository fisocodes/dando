import { type ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { CaslGuard } from "./casl.guard";
import { CaslAbilityFactory } from "./casl-ability.factory";
import { CaslAction } from "./constants/casl-action.constant";
import { CaslSubject } from "./constants/casl-subject.constant";

const makeContext = (method: string, user?: unknown): ExecutionContext =>
	({
		switchToHttp: () => ({ getRequest: () => ({ method, user }) }),
	}) as unknown as ExecutionContext;

describe("CaslGuard", () => {
	let caslAbilityFactory: jest.Mocked<CaslAbilityFactory>;
	let mockAbility: { can: jest.Mock };

	beforeEach(() => {
		mockAbility = { can: jest.fn() };
		caslAbilityFactory = {
			createForUser: jest.fn().mockReturnValue(mockAbility),
		} as unknown as jest.Mocked<CaslAbilityFactory>;
	});

	const createGuard = (subject: CaslSubject) => {
		const GuardClass = CaslGuard(subject);
		return new GuardClass(caslAbilityFactory);
	};

	it("should throw UnauthorizedException when no user is on the request", () => {
		const guard = createGuard(CaslSubject.USERS);
		expect(() => guard.canActivate(makeContext("GET", undefined))).toThrow(
			UnauthorizedException,
		);
	});

	it.each([
		["GET", CaslAction.READ],
		["POST", CaslAction.CREATE],
		["PATCH", CaslAction.UPDATE],
		["DELETE", CaslAction.DELETE],
	] as const)("should map HTTP %s to CaslAction %s", (method, expectedAction) => {
		const guard = createGuard(CaslSubject.USERS);
		mockAbility.can.mockReturnValue(true);

		guard.canActivate(makeContext(method, { id: "uuid", roles: [] }));
		expect(mockAbility.can).toHaveBeenCalledWith(
			expectedAction,
			CaslSubject.USERS,
		);
	});

	it("should return true when the user has the required permission", () => {
		const guard = createGuard(CaslSubject.USERS);
		mockAbility.can.mockReturnValue(true);

		expect(
			guard.canActivate(makeContext("GET", { id: "uuid", roles: [] })),
		).toBe(true);
	});

	it("should return false when the user lacks the required permission", () => {
		const guard = createGuard(CaslSubject.ROLES);
		mockAbility.can.mockReturnValue(false);

		expect(
			guard.canActivate(makeContext("DELETE", { id: "uuid", roles: [] })),
		).toBe(false);
	});
});
