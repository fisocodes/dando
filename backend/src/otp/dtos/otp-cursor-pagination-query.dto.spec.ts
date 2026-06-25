import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { OtpCursorQueryDto } from "./otp-cursor-pagination-query.dto";

const getErrors = async (data: Partial<OtpCursorQueryDto> = {}) =>
	validate(plainToInstance(OtpCursorQueryDto, data));

describe("OtpCursorQueryDto", () => {
	it("should pass with no fields", async () => {
		expect(await getErrors()).toHaveLength(0);
	});

	it("should accept a valid userId UUID", async () => {
		expect(await getErrors({ userId: faker.string.uuid() })).toHaveLength(0);
	});

	it("should reject a non-UUID userId", async () => {
		const errors = await getErrors({ userId: "not-a-uuid" });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("userId");
		expect(errors[0].constraints).toHaveProperty("isUuid");
	});
});
