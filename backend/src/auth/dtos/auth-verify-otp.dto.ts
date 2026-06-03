import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthVerifyOtpDto {
	@IsEmail()
	email!: string;

	@IsString()
	@IsNotEmpty()
	code!: string;
}
