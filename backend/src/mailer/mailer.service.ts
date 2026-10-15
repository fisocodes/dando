import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";

@Injectable()
export class MailerService {
	constructor(@InjectQueue("mailer") private readonly _mailerQueue: Queue) {}

	async sendTemperatureMatchEmail(to: string, code: string): Promise<void> {
		await this._mailerQueue.add(
			"send:temperatureMatch",
			{ code, to },
			{ attempts: 3, backoff: { delay: 1000, type: "exponential" } },
		);
	}
}
