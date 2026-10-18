import { Expose } from "class-transformer";

export abstract class CrudResponseDto {
	@Expose() id: string;
	@Expose() createdAt: Date;
	@Expose() updatedAt: Date;
}
