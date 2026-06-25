import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { AuthVerifyOtpDto } from "./auth-verify-otp.dto";

const getErrors = async (data: Record<string, unknown> = {}) =>
	validate(plainToInstance(AuthVerifyOtpDto, data));

describe("AuthVerifyOtpDto", () => {
	it("should accept a valid email and code", async () => {
		expect(
			await getErrors({ email: "user@example.com", code: "ABC123" }),
		).toHaveLength(0);
	});

	it("should reject an invalid email", async () => {
		const errors = await getErrors({
			email: "not-an-email",
			code: "ABC123",
		});
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("email");
		expect(errors[0].constraints).toHaveProperty("isEmail");
	});

	it("should reject an empty code", async () => {
		const errors = await getErrors({ email: "user@example.com", code: "" });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("code");
		expect(errors[0].constraints).toHaveProperty("isNotEmpty");
	});

	it("should reject a missing code", async () => {
		const errors = await getErrors({ email: "user@example.com" });
		expect(errors.some((e) => e.property === "code")).toBe(true);
	});

	it("should reject a non-string code", async () => {
		const errors = await getErrors({
			email: "user@example.com",
			code: 123,
		});
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("code");
		expect(errors[0].constraints).toHaveProperty("isString");
	});
});
