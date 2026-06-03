import { BaseResponseDto } from "../../common/dtos/base-response.dto";

export class MePermissionDto {
	id!: string;
	action!: string;
	subject!: string;
	inverted!: boolean;
	conditions?: unknown;
}

export class MeRoleDto {
	id!: string;
	name!: string;
	description?: string;
	priority!: number;
	permissions!: MePermissionDto[];
}

export class MeResponseDto extends BaseResponseDto {
	email!: string;
	roles!: MeRoleDto[];
}
