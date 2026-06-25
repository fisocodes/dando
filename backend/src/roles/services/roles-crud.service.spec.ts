import { ConflictException, NotFoundException } from "@nestjs/common";
import type { Repository } from "typeorm";
import type { RolesCreateDto } from "../dtos/roles-create.dto";
import { RolesResponseDto } from "../dtos/roles-response.dto";
import { Role } from "../roles.entity";
import { RolesCrudService } from "./roles-crud.service";
import type { RolesQueryService } from "./roles-query.service";

describe("RolesCrudService", () => {
	let service: RolesCrudService;
	let repository: jest.Mocked<
		Pick<Repository<Role>, "create" | "save" | "merge">
	>;
	let queryService: jest.Mocked<
		Pick<RolesQueryService, "findOneByOrThrow" | "throwIfConflictsWith">
	>;

	const makeRole = (overrides: Partial<Role> = {}): Role =>
		({
			id: "role-uuid",
			name: "admin",
			description: undefined,
			priority: 0,
			createdAt: new Date(),
			updatedAt: new Date(),
			...overrides,
		}) as Role;

	beforeEach(() => {
		repository = { create: jest.fn(), save: jest.fn(), merge: jest.fn() };
		queryService = {
			findOneByOrThrow: jest.fn(),
			throwIfConflictsWith: jest.fn(),
		};
		service = new RolesCrudService(
			repository as unknown as Repository<Role>,
			queryService as unknown as RolesQueryService,
		);
	});

	describe("create", () => {
		it("should create a role and return a response DTO", async () => {
			const dto: RolesCreateDto = { name: "editor", priority: 1 };
			const saved = makeRole(dto);
			queryService.throwIfConflictsWith.mockResolvedValue(undefined);
			repository.create.mockReturnValue(saved);
			repository.save.mockResolvedValue(saved);

			const result = await service.create(dto);

			expect(queryService.throwIfConflictsWith).toHaveBeenCalledWith({
				name: dto.name,
			});
			expect(result).toBeInstanceOf(RolesResponseDto);
		});

		it("should throw ConflictException when name already exists", async () => {
			queryService.throwIfConflictsWith.mockRejectedValue(
				new ConflictException(),
			);
			await expect(
				service.create({ name: "admin", priority: 0 }),
			).rejects.toThrow(ConflictException);
		});
	});

	describe("update", () => {
		it("should update the role and return a response DTO", async () => {
			const role = makeRole();
			queryService.findOneByOrThrow.mockResolvedValue(role);
			queryService.throwIfConflictsWith.mockResolvedValue(undefined);
			repository.merge.mockReturnValue({ ...role, name: "superadmin" } as Role);
			repository.save.mockResolvedValue({
				...role,
				name: "superadmin",
			} as Role);

			const result = await service.update("role-uuid", { name: "superadmin" });
			expect(result).toBeInstanceOf(RolesResponseDto);
		});

		it("should not check name conflict when name is not provided", async () => {
			const role = makeRole();
			queryService.findOneByOrThrow.mockResolvedValue(role);
			repository.merge.mockReturnValue(role);
			repository.save.mockResolvedValue(role);

			await service.update("role-uuid", {});
			expect(queryService.throwIfConflictsWith).not.toHaveBeenCalled();
		});

		it("should throw NotFoundException when role not found", async () => {
			queryService.findOneByOrThrow.mockRejectedValue(new NotFoundException());
			await expect(
				service.update("missing", { name: "new-name" }),
			).rejects.toThrow(NotFoundException);
		});
	});
});
