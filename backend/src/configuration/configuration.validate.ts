import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

import { ConfigurationVariables } from "./configuration.variables";

export function validate(config: Record<string, unknown>) {
	const validateConfig = plainToInstance(ConfigurationVariables, config, {
		enableImplicitConversion: false,
	});

	const errors = validateSync(validateConfig, { skipMissingProperties: false });

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}

	return validateConfig;
}
