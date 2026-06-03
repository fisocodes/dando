import { PartialType } from "@nestjs/swagger";
import { OtpCreateDto } from "./otp-create.dto";

export class OtpUpdateDto extends PartialType(OtpCreateDto) {}
