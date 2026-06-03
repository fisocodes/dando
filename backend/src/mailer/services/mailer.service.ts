import { Injectable } from "@nestjs/common";
import { createTransport, Transporter } from "nodemailer";
import { ConfigurationService } from "../../configuration/configuration.service";

@Injectable()
export class MailerService {
	private transporter: Transporter;
	constructor(protected readonly configService: ConfigurationService) {
		this.transporter = createTransport({
			host: configService.smtpHost,
			port: configService.smtpPort,
			auth: {
				user: configService.smtpUser,
				pass: configService.smtpPassword,
			},
		});
	}

	async send(to: string, subject: string, html: string): Promise<void> {
		await this.transporter.sendMail({
			from: this.configService.smtpFrom,
			to,
			subject,
			html,
		});
	}
}
