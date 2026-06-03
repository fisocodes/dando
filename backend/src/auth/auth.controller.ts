import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Res,
	UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import { AuthRequestOtpDto } from "./dtos/auth-request-otp.dto";
import { AuthTokenResponseDto } from "./dtos/auth-token-response.dto";
import { AuthVerifyOtpDto } from "./dtos/auth-verify-otp.dto";
import { MeResponseDto } from "./dtos/me-response.dto";
import { JwtGuard } from "./jwt.guard";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("request-otp")
	@HttpCode(204)
	requestOtp(@Body() dto: AuthRequestOtpDto): Promise<void> {
		return this.authService.requestOtp(dto.email);
	}

	@Post("verify-otp")
	async verifyOtp(
		@Body() dto: AuthVerifyOtpDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<AuthTokenResponseDto> {
		const accessToken = await this.authService.verifyOtp(dto.email, dto.code);
		res.cookie("access_token", accessToken, {
			httpOnly: true,
			sameSite: "strict",
		});
		return { accessToken };
	}

	@Get("me")
	@UseGuards(JwtGuard)
	getMe(@CurrentUser() user: { id: string }): Promise<MeResponseDto> {
		return this.authService.getMe(user.id);
	}

	@Post("sign-out")
	@HttpCode(204)
	@UseGuards(JwtGuard)
	signOut(@Res({ passthrough: true }) res: Response): void {
		res.clearCookie("access_token");
	}
}
