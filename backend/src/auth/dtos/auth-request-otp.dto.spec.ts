import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { AuthRequestOtpDto } from "./auth-request-otp.dto";

const getErrors = async (data: Partial<AuthRequestOtpDto> = {}) =>
	validate(plainToInstance(AuthRequestOtpDto, data));

describe("AuthRequestOtpDto", () => {
	it("should accept a valid email", async () => {
		expect(await getErrors({ email: "user@example.com" })).toHaveLength(0);
	});

	it("should reject an invalid email", async () => {
		const errors = await getErrors({ email: "not-an-email" });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("email");
		expect(errors[0].constraints).toHaveProperty("isEmail");
	});

	it("should reject a missing email", async () => {
		const errors = await getErrors({});
		expect(errors.some((e) => e.property === "email")).toBe(true);
	});
});
