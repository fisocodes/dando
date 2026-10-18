import { Expose } from "class-transformer";
import { CrudResponseDto } from "../../common/dto/crud-response.dto";

export class UsersCrudResponseDto extends CrudResponseDto {
	@Expose() email: string;
}
