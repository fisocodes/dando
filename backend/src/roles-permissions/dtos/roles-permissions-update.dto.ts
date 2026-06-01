import { PartialType } from "@nestjs/swagger";
import { RolesPermissionsCreateDto } from "./roles-permissions-create.dto";

export class RolesPermissionsUpdateDto extends PartialType(
	RolesPermissionsCreateDto,
) {}
