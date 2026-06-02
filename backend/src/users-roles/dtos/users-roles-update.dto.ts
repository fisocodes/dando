import { PartialType } from "@nestjs/swagger";
import { UsersRolesCreateDto } from "./users-roles-create.dto";

export class UsersRolesUpdateDto extends PartialType(UsersRolesCreateDto) {}
