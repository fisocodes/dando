import { IsEmail } from "class-validator";

export class AuthRequestOtpDto {
	@IsEmail()
	email!: string;
}
