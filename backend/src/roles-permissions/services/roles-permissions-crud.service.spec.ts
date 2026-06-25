import { faker } from "@faker-js/faker";
import { ConflictException, NotFoundException } from "@nestjs/common";
import type { Repository } from "typeorm";
import type { RolesPermissionsCreateDto } from "../dtos/roles-permissions-create.dto";
import { RolesPermissionsResponseDto } from "../dtos/roles-permissions-response.dto";
import { RolePermission } from "../roles-permissions.entity";
import { RolesPermissionsCrudService } from "./roles-permissions-crud.service";
import type { RolesPermissionsQueryService } from "./roles-permissions-query.service";

describe("RolesPermissionsCrudService", () => {
	let service: RolesPermissionsCrudService;
	let repository: jest.Mocked<
		Pick<Repository<RolePermission>, "create" | "save" | "merge">
	>;
	let queryService: jest.Mocked<
		Pick<
			RolesPermissionsQueryService,
			"findOneByOrThrow" | "throwIfConflictsWith"
		>
	>;

	const roleId = faker.string.uuid();
	const permissionId = faker.string.uuid();

	const makeEntity = (): RolePermission =>
		({
			id: faker.string.uuid(),
			roleId,
			permissionId,
			createdAt: new Date(),
			updatedAt: new Date(),
		}) as unknown as RolePermission;

	beforeEach(() => {
		repository = { create: jest.fn(), save: jest.fn(), merge: jest.fn() };
		queryService = {
			findOneByOrThrow: jest.fn(),
			throwIfConflictsWith: jest.fn(),
		};
		service = new RolesPermissionsCrudService(
			repository as unknown as Repository<RolePermission>,
			queryService as unknown as RolesPermissionsQueryService,
		);
	});

	describe("create", () => {
		it("should create a role-permission link and return a response DTO", async () => {
			const dto: RolesPermissionsCreateDto = { roleId, permissionId };
			const saved = makeEntity();
			queryService.throwIfConflictsWith.mockResolvedValue(undefined);
			repository.create.mockReturnValue(saved);
			repository.save.mockResolvedValue(saved);

			const result = await service.create(dto);

			expect(queryService.throwIfConflictsWith).toHaveBeenCalledWith({
				roleId,
				permissionId,
			});
			expect(result).toBeInstanceOf(RolesPermissionsResponseDto);
		});

		it("should throw ConflictException when the link already exists", async () => {
			queryService.throwIfConflictsWith.mockRejectedValue(
				new ConflictException(),
			);
			await expect(service.create({ roleId, permissionId })).rejects.toThrow(
				ConflictException,
			);
		});
	});

	describe("update", () => {
		it("should update and return a response DTO", async () => {
			const entity = makeEntity();
			const newRoleId = faker.string.uuid();
			queryService.findOneByOrThrow.mockResolvedValue(entity);
			queryService.throwIfConflictsWith.mockResolvedValue(undefined);
			repository.merge.mockReturnValue({
				...entity,
				roleId: newRoleId,
			} as unknown as RolePermission);
			repository.save.mockResolvedValue({
				...entity,
				roleId: newRoleId,
			} as unknown as RolePermission);

			const result = await service.update(entity.id, { roleId: newRoleId });
			expect(result).toBeInstanceOf(RolesPermissionsResponseDto);
		});

		it("should throw NotFoundException when entity not found", async () => {
			queryService.findOneByOrThrow.mockRejectedValue(new NotFoundException());
			await expect(
				service.update("missing", { roleId: faker.string.uuid() }),
			).rejects.toThrow(NotFoundException);
		});
	});
});
