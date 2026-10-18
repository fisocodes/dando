import { Transform } from "class-transformer";
import { IsEmail, MaxLength } from "class-validator";

export class UsersCreateDto {
	@Transform(({ value }) =>
		typeof value === "string" ? value.trim().toLocaleLowerCase() : value,
	)
	@IsEmail()
	@MaxLength(254)
	email: string;
}
