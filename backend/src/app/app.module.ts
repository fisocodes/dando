import { Module } from "@nestjs/common";
import { ConfigurationModule } from "../configuration/configuration.module";
import { DatabaseModule } from "../database/database.module";
import { MailerModule } from "../mailer/mailer.module";
import { QueueModule } from "../queue/queue.module";

@Module({
	imports: [ConfigurationModule, DatabaseModule, QueueModule, MailerModule],
})
export class AppModule {}
