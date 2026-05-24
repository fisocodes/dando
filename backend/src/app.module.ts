import { Module } from "@nestjs/common";
import { CaslModule } from "./common/casl/casl.module";
import { ConfigurationModule } from "./configuration/configuration.module";

@Module({
	imports: [ConfigurationModule, CaslModule],
})
export class AppModule {}
