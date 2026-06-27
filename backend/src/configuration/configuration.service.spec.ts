import { ConfigService } from "@nestjs/config";
import { ConfigurationService } from "./configuration.service";
import type { EnvironmentVariables } from "./configuration.validation";

describe("ConfigurationService", () => {
	let service: ConfigurationService;
	let configService: jest.Mocked<Pick<ConfigService, "get">>;

	beforeEach(() => {
		configService = { get: jest.fn() };
		service = new ConfigurationService(
			configService as unknown as ConfigService<EnvironmentVariables, true>,
		);
	});

	it.each([
		["dandoVersion", "DANDO_VERSION", "1.0.0"],
		["dandoPort", "DANDO_PORT", "3000"],
		["databaseHost", "DATABASE_HOST", "localhost"],
		["databasePort", "DATABASE_PORT", 5432],
		["databaseUsername", "DATABASE_USERNAME", "postgres"],
		["databasePassword", "DATABASE_PASSWORD", "pass"],
		["databaseName", "DATABASE_NAME", "dando"],
		["smtpHost", "SMTP_HOST", "smtp.example.com"],
		["smtpPort", "SMTP_PORT", 587],
		["smtpUser", "SMTP_USER", "smtp-user"],
		["smtpPassword", "SMTP_PASSWORD", "smtp-pass"],
		["smtpFrom", "SMTP_FROM", "no-reply@example.com"],
		["otpTtlMs", "OTP_TTL_MS", 300_000],
		["otpLength", "OTP_LENGTH", 6],
		["otpAlphabet", "OTP_ALPHABET", "ABCDEF"],
		["jwtExpiry", "JWT_EXPIRY", "1h"],
		["adminEmail", "ADMIN_EMAIL", "admin@example.com"],
	] as [
		string,
		string,
		unknown,
	][])("getter '%s' should call configService.get('%s') and return the value", (getter, envKey, value) => {
		configService.get.mockImplementation(() => value as never);
		expect((service as unknown as Record<string, unknown>)[getter]).toBe(value);
		expect(configService.get).toHaveBeenCalledWith(envKey);
	});
});
