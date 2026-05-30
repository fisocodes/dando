import { BaseResponseDto } from "../../common/dtos/base-response.dto";

export class RolesResponseDto extends BaseResponseDto {
	name!: string;
	description?: string;
	priority!: number;
}
