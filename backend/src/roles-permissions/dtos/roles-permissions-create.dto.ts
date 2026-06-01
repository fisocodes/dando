import { IsUUID } from "class-validator";

export class RolesPermissionsCreateDto {
	@IsUUID()
	roleId!: string;

	@IsUUID()
	permissionId!: string;
}
