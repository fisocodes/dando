import { Module } from "@nestjs/common";
import { ConfigurationModule } from "../configuration/configuration.module";
import { MailerService } from "./services/mailer.service";

@Module({
	imports: [ConfigurationModule],
	providers: [MailerService],
	exports: [MailerService],
})
export class MailerModule {}
