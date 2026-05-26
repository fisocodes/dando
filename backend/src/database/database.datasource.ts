import { config } from "dotenv";

config();

import { DataSource } from "typeorm";

export default new DataSource({
	type: "postgres",
	host: process.env.DATABASE_HOST,
	port: parseInt(process.env.DATABASE_PORT ?? "5432", 10),
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	synchronize: false,
	entities: ["src/**/*.entity.ts"],
	migrations: ["./migrations/**/*{.js,.ts}"],
	migrationsRun: false,
	migrationsTableName: "migrations",
	migrationsTransactionMode: "all",
});
