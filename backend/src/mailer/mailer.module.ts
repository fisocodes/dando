import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";

import { MailerProcessor } from "./mailer.processor";
import { MailerService } from "./mailer.service";

@Module({
	imports: [BullModule.registerQueue({ name: "mailer" })],
	providers: [MailerService, MailerProcessor],
})
export class MailerModule {}
