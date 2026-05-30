import { PartialType } from "@nestjs/swagger";
import { RolesCreateDto } from "./roles-create.dto";

export class RolesUpdateDto extends PartialType(RolesCreateDto) {}
