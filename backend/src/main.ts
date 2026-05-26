import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ConfigurationService } from "./configuration/configuration.service";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const configurationService = app.get(ConfigurationService);

	const config = new DocumentBuilder()
		.setTitle("Dando REST API documentation")
		.setDescription("Dando REST API documentation")
		.setVersion(configurationService.dandoVersion)
		.build();

	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("swagger", app, documentFactory);

	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	await app.listen(configurationService.dandoPort);
}
bootstrap();
