import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import { AppModule } from "./app/app.module";
import { ConfigurationService } from "./configuration/configuration.service";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const configurationService = app.get(ConfigurationService);

	const swaggerConfig = new DocumentBuilder()
		.setTitle("Dando API reference")
		.setDescription("Dando API reference")
		.setVersion(configurationService.appVersion)
		.build();

	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

	app.use(
		"/reference",
		apiReference({
			content: swaggerDocument,
			pageTitle: "Dando API reference",
		}),
	);
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
	await app.listen(configurationService.appPort);
}
bootstrap();
