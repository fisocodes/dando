import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CaslAction } from "../../common/casl/constants/casl-action.constant";
import { CaslSubject } from "../../common/casl/constants/casl-subject.constant";
import { PermissionsCursorQueryDto } from "./permissions-cursor-pagination-query.dto";

const getErrors = async (data: Record<string, unknown> = {}) =>
	validate(plainToInstance(PermissionsCursorQueryDto, data));

describe("PermissionsCursorQueryDto", () => {
	it("should pass with no fields", async () => {
		expect(await getErrors()).toHaveLength(0);
	});

	it("should accept valid action and subject", async () => {
		expect(
			await getErrors({
				action: CaslAction.READ,
				subject: CaslSubject.USERS,
			}),
		).toHaveLength(0);
	});

	it("should reject an invalid action", async () => {
		const errors = await getErrors({ action: "bad" });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("action");
		expect(errors[0].constraints).toHaveProperty("isIn");
	});

	it("should reject an invalid subject", async () => {
		const errors = await getErrors({ subject: "bad" });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("subject");
		expect(errors[0].constraints).toHaveProperty("isIn");
	});

	it("should reject a non-boolean inverted", async () => {
		const errors = await getErrors({ inverted: "true" });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("inverted");
		expect(errors[0].constraints).toHaveProperty("isBoolean");
	});
});
