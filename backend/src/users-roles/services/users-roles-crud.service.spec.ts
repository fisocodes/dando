import { faker } from "@faker-js/faker";
import { ConflictException, NotFoundException } from "@nestjs/common";
import type { Repository } from "typeorm";
import type { UsersRolesCreateDto } from "../dtos/users-roles-create.dto";
import { UsersRolesResponseDto } from "../dtos/users-roles-response.dto";
import { UserRole } from "../users-roles.entity";
import { UsersRolesCrudService } from "./users-roles-crud.service";
import type { UsersRolesQueryService } from "./users-roles-query.service";

describe("UsersRolesCrudService", () => {
	let service: UsersRolesCrudService;
	let repository: jest.Mocked<
		Pick<Repository<UserRole>, "create" | "save" | "merge">
	>;
	let queryService: jest.Mocked<
		Pick<UsersRolesQueryService, "findOneByOrThrow" | "throwIfConflictsWith">
	>;

	const userId = faker.string.uuid();
	const roleId = faker.string.uuid();

	const makeEntity = (): UserRole =>
		({
			id: faker.string.uuid(),
			userId,
			roleId,
			createdAt: new Date(),
			updatedAt: new Date(),
		}) as unknown as UserRole;

	beforeEach(() => {
		repository = { create: jest.fn(), save: jest.fn(), merge: jest.fn() };
		queryService = {
			findOneByOrThrow: jest.fn(),
			throwIfConflictsWith: jest.fn(),
		};
		service = new UsersRolesCrudService(
			repository as unknown as Repository<UserRole>,
			queryService as unknown as UsersRolesQueryService,
		);
	});

	describe("create", () => {
		it("should create a user-role link and return a response DTO", async () => {
			const dto: UsersRolesCreateDto = { userId, roleId };
			const saved = makeEntity();
			queryService.throwIfConflictsWith.mockResolvedValue(undefined);
			repository.create.mockReturnValue(saved);
			repository.save.mockResolvedValue(saved);

			const result = await service.create(dto);

			expect(queryService.throwIfConflictsWith).toHaveBeenCalledWith({
				userId,
				roleId,
			});
			expect(result).toBeInstanceOf(UsersRolesResponseDto);
		});

		it("should throw ConflictException when the link already exists", async () => {
			queryService.throwIfConflictsWith.mockRejectedValue(
				new ConflictException(),
			);
			await expect(service.create({ userId, roleId })).rejects.toThrow(
				ConflictException,
			);
		});
	});

	describe("update", () => {
		it("should update and return a response DTO", async () => {
			const entity = makeEntity();
			const newUserId = faker.string.uuid();
			queryService.findOneByOrThrow.mockResolvedValue(entity);
			queryService.throwIfConflictsWith.mockResolvedValue(undefined);
			repository.merge.mockReturnValue({
				...entity,
				userId: newUserId,
			} as unknown as UserRole);
			repository.save.mockResolvedValue({
				...entity,
				userId: newUserId,
			} as unknown as UserRole);

			const result = await service.update(entity.id, { userId: newUserId });
			expect(result).toBeInstanceOf(UsersRolesResponseDto);
		});

		it("should throw NotFoundException when entity not found", async () => {
			queryService.findOneByOrThrow.mockRejectedValue(new NotFoundException());
			await expect(service.update("missing", {})).rejects.toThrow(
				NotFoundException,
			);
		});
	});
});
