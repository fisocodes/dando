import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CaslAction } from "../../common/casl/constants/casl-action.constant";
import { CaslSubject } from "../../common/casl/constants/casl-subject.constant";
import { PermissionsCreateDto } from "./permissions-create.dto";

const getErrors = async (data: Record<string, unknown> = {}) =>
	validate(plainToInstance(PermissionsCreateDto, data));

const VALID_BASE = {
	action: CaslAction.READ,
	subject: CaslSubject.USERS,
};

describe("PermissionsCreateDto", () => {
	it("should default inverted to false", () => {
		expect(new PermissionsCreateDto().inverted).toBe(false);
	});

	it("should accept valid action and subject", async () => {
		expect(await getErrors(VALID_BASE)).toHaveLength(0);
	});

	it("should accept all optional fields", async () => {
		expect(
			await getErrors({
				...VALID_BASE,
				inverted: true,
				conditions: { $eq: "123" },
			}),
		).toHaveLength(0);
	});

	describe("action", () => {
		it.each(
			Object.values(CaslAction),
		)("should accept action '%s'", async (action) => {
			expect(await getErrors({ ...VALID_BASE, action })).toHaveLength(0);
		});

		it("should reject an invalid action", async () => {
			const errors = await getErrors({
				...VALID_BASE,
				action: "invalid",
			});
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("action");
			expect(errors[0].constraints).toHaveProperty("isIn");
		});

		it("should reject a missing action", async () => {
			const errors = await getErrors({ subject: CaslSubject.USERS });
			expect(errors.some((e) => e.property === "action")).toBe(true);
		});
	});

	describe("subject", () => {
		it.each(
			Object.values(CaslSubject),
		)("should accept subject '%s'", async (subject) => {
			expect(await getErrors({ ...VALID_BASE, subject })).toHaveLength(0);
		});

		it("should reject an invalid subject", async () => {
			const errors = await getErrors({
				...VALID_BASE,
				subject: "invalid",
			});
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("subject");
			expect(errors[0].constraints).toHaveProperty("isIn");
		});
	});

	describe("inverted", () => {
		it("should reject a non-boolean inverted", async () => {
			const errors = await getErrors({
				...VALID_BASE,
				inverted: "true",
			});
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("inverted");
			expect(errors[0].constraints).toHaveProperty("isBoolean");
		});
	});

	describe("conditions", () => {
		it("should reject a non-object conditions", async () => {
			const errors = await getErrors({
				...VALID_BASE,
				conditions: "cond",
			});
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("conditions");
			expect(errors[0].constraints).toHaveProperty("isObject");
		});
	});
});
