import { Type } from "class-transformer";
import { IsNumber, Max, Min } from "class-validator";

export class ConfigurationVariables {
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	@Max(65_535)
	APP_PORT!: number;
}
