import "reflect-metadata";
import { validate } from "./configuration.validation";

const validConfig: Record<string, string> = {
	DANDO_VERSION: "1.0.0",
	DANDO_PORT: "3000",
	DATABASE_HOST: "localhost",
	DATABASE_PORT: "5432",
	DATABASE_USERNAME: "postgres",
	DATABASE_PASSWORD: "password",
	DATABASE_NAME: "dando",
	SMTP_HOST: "smtp.example.com",
	SMTP_PORT: "587",
	SMTP_USER: "smtp-user",
	SMTP_PASSWORD: "smtp-password",
	SMTP_FROM: "no-reply@example.com",
	OTP_TTL_MS: "300000",
	OTP_LENGTH: "6",
	OTP_ALPHABET: "ABCDEF",
	JWT_EXPIRY: "1h",
};

describe("configuration validate()", () => {
	it("should return the validated config for a fully valid env", () => {
		const result = validate(validConfig);
		expect(result).toBeDefined();
		expect(result.DANDO_VERSION).toBe("1.0.0");
		expect(result.DATABASE_PORT).toBe(5432);
	});

	it("should throw when DANDO_VERSION does not match semver format", () => {
		expect(() => validate({ ...validConfig, DANDO_VERSION: "1.0" })).toThrow();
	});

	it("should throw when DATABASE_HOST is missing", () => {
		const { DATABASE_HOST: _, ...rest } = validConfig;
		expect(() => validate(rest)).toThrow();
	});

	it("should throw when SMTP_HOST is not a valid FQDN", () => {
		expect(() =>
			validate({ ...validConfig, SMTP_HOST: "localhost" }),
		).toThrow();
	});

	it("should throw when SMTP_FROM is not a valid email", () => {
		expect(() =>
			validate({ ...validConfig, SMTP_FROM: "not-an-email" }),
		).toThrow();
	});

	it("should throw when OTP_ALPHABET is an empty string", () => {
		expect(() => validate({ ...validConfig, OTP_ALPHABET: "" })).toThrow();
	});

	it("should throw when JWT_EXPIRY is missing", () => {
		const { JWT_EXPIRY: _, ...rest } = validConfig;
		expect(() => validate(rest)).toThrow();
	});
});
