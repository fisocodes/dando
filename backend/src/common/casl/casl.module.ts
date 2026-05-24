import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { CaslGuard } from "./casl.guard";
import { CaslAbilityFactory } from "./casl-ability.factory";

@Module({
	providers: [
		CaslAbilityFactory,
		{
			provide: APP_GUARD,
			useClass: CaslGuard,
		},
	],
	exports: [CaslAbilityFactory],
})
export class CaslModule {}
