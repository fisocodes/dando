import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UsersOffsetPaginationQueryDto } from "./users-offset-pagination-query.dto";

const getErrors = async (data: Partial<UsersOffsetPaginationQueryDto> = {}) =>
	validate(plainToInstance(UsersOffsetPaginationQueryDto, data));

describe("UsersOffsetPaginationQueryDto", () => {
	it("should pass with no fields", async () => {
		expect(await getErrors()).toHaveLength(0);
	});

	it("should accept a valid email", async () => {
		expect(await getErrors({ email: "user@example.com" })).toHaveLength(0);
	});

	it("should reject an invalid email", async () => {
		const errors = await getErrors({ email: "not-an-email" });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("email");
		expect(errors[0].constraints).toHaveProperty("isEmail");
	});
});
