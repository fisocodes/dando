import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CaslGuard } from "../../common/casl/casl.guard";
import { CaslSubject } from "../../common/casl/constants/casl-subject.constant";
import { CursorPaginationResponseDto } from "../../common/dtos/cursor-pagination-response.dto";
import { OffsetPaginationResponseDto } from "../../common/dtos/offset-pagination-response.dto";
import { UsersCursorPaginationQueryDto } from "../dtos/users-cursor-pagination-query.dto";
import { UsersOffsetPaginationQueryDto } from "../dtos/users-offset-pagination-query.dto";
import { UsersResponseDto } from "../dtos/users-response.dto";
import { UsersPaginationService } from "../services/users-pagination.service";

@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(CaslGuard(CaslSubject.USERS))
@Controller("users")
export class UsersPaginationController {
	constructor(private readonly paginationService: UsersPaginationService) {}

	@Get("offset")
	findWithOffset(
		@Query() query: UsersOffsetPaginationQueryDto,
	): Promise<OffsetPaginationResponseDto<UsersResponseDto>> {
		return this.paginationService.findWithOffset(query);
	}

	@Get("cursor")
	findWithCursor(
		@Query() query: UsersCursorPaginationQueryDto,
	): Promise<CursorPaginationResponseDto<UsersResponseDto>> {
		return this.paginationService.findWithCursor(query);
	}
}
