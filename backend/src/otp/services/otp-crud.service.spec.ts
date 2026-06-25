import { faker } from "@faker-js/faker";
import { NotFoundException } from "@nestjs/common";
import type { Repository } from "typeorm";
import type { ConfigurationService } from "../../configuration/configuration.service";
import type { UsersQueryService } from "../../users/services/users-query.service";
import type { User } from "../../users/users.entity";
import { OtpResponseDto } from "../dtos/otp-response.dto";
import { Otp } from "../otp.entity";
import { OtpCrudService } from "./otp-crud.service";
import type { OtpQueryService } from "./otp-query.service";

describe("OtpCrudService", () => {
	let service: OtpCrudService;
	let repository: jest.Mocked<
		Pick<Repository<Otp>, "create" | "save" | "softRemove" | "merge">
	>;
	let queryService: jest.Mocked<
		Pick<OtpQueryService, "findOneByOrThrow" | "findManyBy">
	>;
	let usersQueryService: jest.Mocked<
		Pick<UsersQueryService, "findOneByOrThrow">
	>;
	let configurationService: {
		otpLength: number;
		otpAlphabet: string;
		otpTtlMs: number;
	};

	const userId = faker.string.uuid();

	const makeUser = (): User =>
		({
			id: userId,
			email: "user@example.com",
			secret: "user-hmac-secret",
			createdAt: new Date(),
			updatedAt: new Date(),
		}) as User;

	const makeOtp = (): Otp =>
		({
			id: faker.string.uuid(),
			userId,
			code: "hashed",
			expiresAt: new Date(Date.now() + 300_000),
			createdAt: new Date(),
			updatedAt: new Date(),
		}) as unknown as Otp;

	beforeEach(() => {
		repository = {
			create: jest.fn(),
			save: jest.fn(),
			softRemove: jest.fn(),
			merge: jest.fn(),
		};
		queryService = { findOneByOrThrow: jest.fn(), findManyBy: jest.fn() };
		usersQueryService = { findOneByOrThrow: jest.fn() };
		configurationService = {
			otpLength: 6,
			otpAlphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
			otpTtlMs: 300_000,
		};

		service = new OtpCrudService(
			repository as unknown as Repository<Otp>,
			queryService as unknown as OtpQueryService,
			usersQueryService as unknown as UsersQueryService,
			configurationService as unknown as ConfigurationService,
		);
	});

	describe("generate", () => {
		it("should return an OTP and a plain text code of the configured length", async () => {
			const user = makeUser();
			const otp = makeOtp();
			usersQueryService.findOneByOrThrow.mockResolvedValue(user);
			queryService.findManyBy.mockResolvedValue([]);
			repository.create.mockReturnValue(otp);
			repository.save.mockResolvedValue(otp);

			const result = await service.generate(userId);

			expect(result.plainCode).toHaveLength(6);
			expect(result.plainCode).toMatch(/^[A-Z0-9]{6}$/);
			expect(result.otp).toBeInstanceOf(OtpResponseDto);
		});

		it("should soft-remove existing OTPs before creating a new one", async () => {
			const user = makeUser();
			const existing = [makeOtp(), makeOtp()];
			const newOtp = makeOtp();
			usersQueryService.findOneByOrThrow.mockResolvedValue(user);
			queryService.findManyBy.mockResolvedValue(existing);
			repository.create.mockReturnValue(newOtp);
			repository.save.mockResolvedValue(newOtp);

			await service.generate(userId);
			expect(repository.softRemove).toHaveBeenCalledWith(existing);
		});

		it("should not call softRemove when no existing OTPs", async () => {
			const user = makeUser();
			const otp = makeOtp();
			usersQueryService.findOneByOrThrow.mockResolvedValue(user);
			queryService.findManyBy.mockResolvedValue([]);
			repository.create.mockReturnValue(otp);
			repository.save.mockResolvedValue(otp);

			await service.generate(userId);
			expect(repository.softRemove).not.toHaveBeenCalled();
		});

		it("should throw NotFoundException when user not found", async () => {
			usersQueryService.findOneByOrThrow.mockRejectedValue(
				new NotFoundException(),
			);
			await expect(service.generate("missing")).rejects.toThrow(
				NotFoundException,
			);
		});
	});

	describe("create", () => {
		it("should call generate and return the OTP response", async () => {
			const user = makeUser();
			const otp = makeOtp();
			usersQueryService.findOneByOrThrow.mockResolvedValue(user);
			queryService.findManyBy.mockResolvedValue([]);
			repository.create.mockReturnValue(otp);
			repository.save.mockResolvedValue(otp);

			const result = await service.create({ userId });
			expect(result).toBeInstanceOf(OtpResponseDto);
		});
	});

	describe("update", () => {
		it("should update an OTP and return a response DTO", async () => {
			const otp = makeOtp();
			const newUserId = faker.string.uuid();
			queryService.findOneByOrThrow.mockResolvedValue(otp);
			repository.merge.mockReturnValue({
				...otp,
				userId: newUserId,
			} as unknown as Otp);
			repository.save.mockResolvedValue({
				...otp,
				userId: newUserId,
			} as unknown as Otp);

			const result = await service.update(otp.id, { userId: newUserId });
			expect(result).toBeInstanceOf(OtpResponseDto);
		});

		it("should throw NotFoundException when OTP not found", async () => {
			queryService.findOneByOrThrow.mockRejectedValue(new NotFoundException());
			await expect(service.update("missing", {})).rejects.toThrow(
				NotFoundException,
			);
		});
	});
});
