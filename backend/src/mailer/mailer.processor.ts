import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { createTransport, Transporter } from "nodemailer";
import { render } from "react-email";

import { ConfigurationService } from "../configuration/configuration.service";
import TemperatureMatchTemplate from "./templates/temperature-match.template";

@Processor("mailer")
export class MailerProcessor extends WorkerHost {
	private readonly transporter: Transporter;

	constructor(private readonly _configurationService: ConfigurationService) {
		super();
		this.transporter = createTransport({
			auth: {
				pass: this._configurationService.smtpPassword,
				user: this._configurationService.smtpUser,
			},
			host: this._configurationService.smtpHost,
			port: this._configurationService.smtpPort,
			secure: this._configurationService.smtpSecure,
		});
	}

	async process(job: Job<{ to: string; temperature: number }>): Promise<void> {
		if (job.name !== "send:temperatureMatch") {
			return;
		}

		const html = await render(
			TemperatureMatchTemplate({ temperature: job.data.temperature }),
		);

		await this.transporter.sendMail({
			from: this._configurationService.smtpFrom,
			html,
			subject: "Temperature match!",
			to: job.data.to,
		});
	}
}
