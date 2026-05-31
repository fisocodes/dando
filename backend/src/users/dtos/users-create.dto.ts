import { IsEmail, IsNotEmpty } from "class-validator";

export class UsersCreateDto {
	@IsEmail()
	@IsNotEmpty()
	email!: string;
}
