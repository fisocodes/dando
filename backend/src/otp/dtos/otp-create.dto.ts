import { IsUUID } from "class-validator";

export class OtpCreateDto {
	@IsUUID()
	userId!: string;
}
