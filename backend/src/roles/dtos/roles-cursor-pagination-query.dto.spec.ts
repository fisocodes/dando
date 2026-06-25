import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { RolesCursorQueryDto } from "./roles-cursor-pagination-query.dto";

const getErrors = async (data: Record<string, unknown> = {}) =>
	validate(plainToInstance(RolesCursorQueryDto, data));

describe("RolesCursorQueryDto", () => {
	it("should pass with no fields", async () => {
		expect(await getErrors()).toHaveLength(0);
	});

	it("should accept name and priority", async () => {
		expect(await getErrors({ name: "admin", priority: 5 })).toHaveLength(0);
	});

	it("should reject a non-string name", async () => {
		const errors = await getErrors({ name: 123 });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("name");
		expect(errors[0].constraints).toHaveProperty("isString");
	});

	it("should reject a negative priority", async () => {
		const errors = await getErrors({ priority: -1 });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("priority");
		expect(errors[0].constraints).toHaveProperty("min");
	});
});
