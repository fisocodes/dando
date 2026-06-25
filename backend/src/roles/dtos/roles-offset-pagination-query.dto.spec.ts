import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { RolesOffsetQueryDto } from "./roles-offset-pagination-query.dto";

const getErrors = async (data: Partial<RolesOffsetQueryDto> = {}) =>
	validate(plainToInstance(RolesOffsetQueryDto, data));

describe("RolesOffsetQueryDto", () => {
	it("should pass with no fields", async () => {
		expect(await getErrors()).toHaveLength(0);
	});

	it("should accept name and priority", async () => {
		expect(await getErrors({ name: "editor", priority: 1 })).toHaveLength(0);
	});

	it("should reject a float priority", async () => {
		const errors = await getErrors({ priority: 1.5 });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("priority");
		expect(errors[0].constraints).toHaveProperty("isInt");
	});
});
