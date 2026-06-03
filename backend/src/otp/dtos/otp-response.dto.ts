import { BaseResponseDto } from "../../common/dtos/base-response.dto";

export class OtpResponseDto extends BaseResponseDto {
	userId!: string;
	code!: string;
	expiresAt!: Date;
}
