import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CaslAction } from "../../common/casl/constants/casl-action.constant";
import { CaslSubject } from "../../common/casl/constants/casl-subject.constant";
import { PermissionsOffsetQueryDto } from "./permissions-offset-pagination-query.dto";

const getErrors = async (data: Record<string, unknown> = {}) =>
	validate(plainToInstance(PermissionsOffsetQueryDto, data));

describe("PermissionsOffsetQueryDto", () => {
	it("should pass with no fields", async () => {
		expect(await getErrors()).toHaveLength(0);
	});

	it("should accept valid action and subject", async () => {
		expect(
			await getErrors({
				action: CaslAction.CREATE,
				subject: CaslSubject.ROLES,
			}),
		).toHaveLength(0);
	});

	it("should reject an invalid action", async () => {
		const errors = await getErrors({ action: "bad" });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("action");
	});

	it("should reject an invalid subject", async () => {
		const errors = await getErrors({ subject: "bad" });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("subject");
	});
});
