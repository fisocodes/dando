import * as nodemailer from "nodemailer";
import type { ConfigurationService } from "../../configuration/configuration.service";
import { MailerService } from "./mailer.service";

jest.mock("nodemailer");

describe("MailerService", () => {
	let service: MailerService;
	let mockSendMail: jest.Mock;
	const configService: Pick<
		ConfigurationService,
		"smtpHost" | "smtpPort" | "smtpUser" | "smtpPassword" | "smtpFrom"
	> = {
		smtpHost: "smtp.example.com",
		smtpPort: 587,
		smtpUser: "smtp-user",
		smtpPassword: "smtp-pass",
		smtpFrom: "no-reply@example.com",
	};

	beforeEach(() => {
		mockSendMail = jest.fn().mockResolvedValue(undefined);
		(nodemailer.createTransport as jest.Mock).mockReturnValue({
			sendMail: mockSendMail,
		});
		service = new MailerService(
			configService as unknown as ConfigurationService,
		);
	});

	it("should create a transport with the config values", () => {
		expect(nodemailer.createTransport).toHaveBeenCalledWith({
			host: "smtp.example.com",
			port: 587,
			auth: { user: "smtp-user", pass: "smtp-pass" },
		});
	});

	it("should call sendMail with the correct parameters", async () => {
		await service.send("to@example.com", "Hello", "<p>World</p>");

		expect(mockSendMail).toHaveBeenCalledWith({
			from: "no-reply@example.com",
			to: "to@example.com",
			subject: "Hello",
			html: "<p>World</p>",
		});
	});

	it("should propagate errors thrown by sendMail", async () => {
		mockSendMail.mockRejectedValue(new Error("SMTP error"));
		await expect(
			service.send("to@example.com", "Subject", "<p>body</p>"),
		).rejects.toThrow("SMTP error");
	});
});
