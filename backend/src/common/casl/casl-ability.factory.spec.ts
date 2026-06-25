import { CaslAbilityFactory } from "./casl-ability.factory";
import { CaslAction } from "./constants/casl-action.constant";
import { CaslSubject } from "./constants/casl-subject.constant";
import type { CaslPermission } from "./interfaces/casl-permission.interface";
import type { CaslUser } from "./interfaces/casl-user.interface";

const makeUser = (permissions: CaslPermission[]): CaslUser => ({
	id: "user-uuid",
	roles: [{ permissions }],
});

describe("CaslAbilityFactory", () => {
	let factory: CaslAbilityFactory;

	beforeEach(() => {
		factory = new CaslAbilityFactory();
	});

	it("should grant an ability when the permission is not inverted", () => {
		const user = makeUser([
			{ action: CaslAction.READ, subject: CaslSubject.USERS, inverted: false },
		]);
		const ability = factory.createForUser(user);
		expect(ability.can(CaslAction.READ, CaslSubject.USERS)).toBe(true);
	});

	it("should deny an ability when the permission is inverted", () => {
		const user = makeUser([
			{ action: CaslAction.DELETE, subject: CaslSubject.USERS, inverted: true },
		]);
		const ability = factory.createForUser(user);
		expect(ability.can(CaslAction.DELETE, CaslSubject.USERS)).toBe(false);
	});

	it("should deny all actions for a user with no roles", () => {
		const ability = factory.createForUser({ id: "user-uuid", roles: [] });
		expect(ability.can(CaslAction.READ, CaslSubject.USERS)).toBe(false);
	});

	it("should grant all CRUD actions when action is MANAGE", () => {
		const user = makeUser([
			{
				action: CaslAction.MANAGE,
				subject: CaslSubject.USERS,
				inverted: false,
			},
		]);
		const ability = factory.createForUser(user);
		expect(ability.can(CaslAction.READ, CaslSubject.USERS)).toBe(true);
		expect(ability.can(CaslAction.CREATE, CaslSubject.USERS)).toBe(true);
		expect(ability.can(CaslAction.UPDATE, CaslSubject.USERS)).toBe(true);
		expect(ability.can(CaslAction.DELETE, CaslSubject.USERS)).toBe(true);
	});

	it("should accumulate permissions across multiple roles", () => {
		const user: CaslUser = {
			id: "user-uuid",
			roles: [
				{
					permissions: [
						{
							action: CaslAction.READ,
							subject: CaslSubject.ROLES,
							inverted: false,
						},
					],
				},
				{
					permissions: [
						{
							action: CaslAction.CREATE,
							subject: CaslSubject.ROLES,
							inverted: false,
						},
					],
				},
			],
		};
		const ability = factory.createForUser(user);
		expect(ability.can(CaslAction.READ, CaslSubject.ROLES)).toBe(true);
		expect(ability.can(CaslAction.CREATE, CaslSubject.ROLES)).toBe(true);
		expect(ability.can(CaslAction.DELETE, CaslSubject.ROLES)).toBe(false);
	});
});
