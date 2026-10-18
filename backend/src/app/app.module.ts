import { Module } from "@nestjs/common";
import { ConfigurationModule } from "../configuration/configuration.module";
import { DatabaseModule } from "../database/database.module";
import { MailerModule } from "../mailer/mailer.module";
import { QueueModule } from "../queue/queue.module";
import { UsersModule } from "../users/users.module";

@Module({
	imports: [
		ConfigurationModule,
		DatabaseModule,
		QueueModule,
		MailerModule,
		UsersModule,
	],
})
export class AppModule {}
