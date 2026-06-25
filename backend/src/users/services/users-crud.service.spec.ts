import { ConflictException, NotFoundException } from "@nestjs/common";
import type { Repository } from "typeorm";
import type { UsersCreateDto } from "../dtos/users-create.dto";
import { UsersResponseDto } from "../dtos/users-response.dto";
import type { UsersUpdateDto } from "../dtos/users-update.dto";
import { User } from "../users.entity";
import { UsersCrudService } from "./users-crud.service";
import type { UsersQueryService } from "./users-query.service";

describe("UsersCrudService", () => {
	let service: UsersCrudService;
	let repository: jest.Mocked<
		Pick<Repository<User>, "create" | "save" | "merge">
	>;
	let queryService: jest.Mocked<
		Pick<UsersQueryService, "findOneByOrThrow" | "throwIfConflictsWith">
	>;

	const makeUser = (overrides: Partial<User> = {}): User =>
		({
			id: "user-uuid",
			email: "user@example.com",
			secret: "user-secret",
			createdAt: new Date(),
			updatedAt: new Date(),
			...overrides,
		}) as User;

	beforeEach(() => {
		repository = { create: jest.fn(), save: jest.fn(), merge: jest.fn() };
		queryService = {
			findOneByOrThrow: jest.fn(),
			throwIfConflictsWith: jest.fn(),
		};
		service = new UsersCrudService(
			repository as unknown as Repository<User>,
			queryService as unknown as UsersQueryService,
		);
	});

	describe("create", () => {
		it("should create a user and return a response DTO", async () => {
			const dto: UsersCreateDto = { email: "new@example.com" };
			const saved = makeUser({ email: dto.email });
			queryService.throwIfConflictsWith.mockResolvedValue(undefined);
			repository.create.mockReturnValue(saved);
			repository.save.mockResolvedValue(saved);

			const result = await service.create(dto);

			expect(queryService.throwIfConflictsWith).toHaveBeenCalledWith({
				email: dto.email,
			});
			expect(repository.create).toHaveBeenCalledWith(
				expect.objectContaining({
					email: dto.email,
					secret: expect.any(String),
				}),
			);
			expect(result).toBeInstanceOf(UsersResponseDto);
		});

		it("should throw ConflictException when email already exists", async () => {
			queryService.throwIfConflictsWith.mockRejectedValue(
				new ConflictException(),
			);
			await expect(
				service.create({ email: "existing@example.com" }),
			).rejects.toThrow(ConflictException);
		});
	});

	describe("update", () => {
		it("should update the user and return a response DTO", async () => {
			const user = makeUser();
			const dto: UsersUpdateDto = { email: "updated@example.com" };
			queryService.findOneByOrThrow.mockResolvedValue(user);
			queryService.throwIfConflictsWith.mockResolvedValue(undefined);
			repository.merge.mockReturnValue({ ...user, ...dto } as User);
			repository.save.mockResolvedValue({ ...user, ...dto } as User);

			const result = await service.update("user-uuid", dto);

			expect(queryService.findOneByOrThrow).toHaveBeenCalledWith({
				id: "user-uuid",
			});
			expect(result).toBeInstanceOf(UsersResponseDto);
		});

		it("should not check email conflict when email is not provided", async () => {
			const user = makeUser();
			queryService.findOneByOrThrow.mockResolvedValue(user);
			repository.merge.mockReturnValue(user);
			repository.save.mockResolvedValue(user);

			await service.update("user-uuid", {});
			expect(queryService.throwIfConflictsWith).not.toHaveBeenCalled();
		});

		it("should throw NotFoundException when user not found", async () => {
			queryService.findOneByOrThrow.mockRejectedValue(new NotFoundException());
			await expect(
				service.update("missing", { email: "x@example.com" }),
			).rejects.toThrow(NotFoundException);
		});
	});
});
