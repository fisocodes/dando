import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { OtpCreateDto } from "./otp-create.dto";

const getErrors = async (data: Partial<OtpCreateDto> = {}) =>
	validate(plainToInstance(OtpCreateDto, data));

describe("OtpCreateDto", () => {
	it("should accept a valid UUID", async () => {
		expect(await getErrors({ userId: faker.string.uuid() })).toHaveLength(0);
	});

	it("should reject a non-UUID string", async () => {
		const errors = await getErrors({ userId: "not-a-uuid" });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("userId");
		expect(errors[0].constraints).toHaveProperty("isUuid");
	});

	it("should reject a missing userId", async () => {
		const errors = await getErrors({});
		expect(errors.some((e) => e.property === "userId")).toBe(true);
	});
});
