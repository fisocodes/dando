import { BaseResponseDto } from "../../common/dtos/base-response.dto";

export class UsersRolesResponseDto extends BaseResponseDto {
	userId!: string;
	roleId!: string;
}
