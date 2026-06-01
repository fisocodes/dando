import { BaseResponseDto } from "../../common/dtos/base-response.dto";

export class RolesPermissionsResponseDto extends BaseResponseDto {
	roleId!: string;
	permissionId!: string;
}
