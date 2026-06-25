import { NotFoundException } from "@nestjs/common";
import type { Repository } from "typeorm";
import { CaslAction } from "../../common/casl/constants/casl-action.constant";
import { CaslSubject } from "../../common/casl/constants/casl-subject.constant";
import type { PermissionsCreateDto } from "../dtos/permissions-create.dto";
import { PermissionsResponseDto } from "../dtos/permissions-response.dto";
import { Permission } from "../permissions.entity";
import { PermissionsCrudService } from "./permissions-crud.service";
import type { PermissionsQueryService } from "./permissions-query.service";

describe("PermissionsCrudService", () => {
	let service: PermissionsCrudService;
	let repository: jest.Mocked<
		Pick<Repository<Permission>, "create" | "save" | "merge">
	>;
	let queryService: jest.Mocked<
		Pick<PermissionsQueryService, "findOneByOrThrow">
	>;

	const makePermission = (overrides: Partial<Permission> = {}): Permission =>
		({
			id: "perm-uuid",
			action: CaslAction.READ,
			subject: CaslSubject.USERS,
			inverted: false,
			conditions: undefined,
			createdAt: new Date(),
			updatedAt: new Date(),
			...overrides,
		}) as Permission;

	beforeEach(() => {
		repository = { create: jest.fn(), save: jest.fn(), merge: jest.fn() };
		queryService = { findOneByOrThrow: jest.fn() };
		service = new PermissionsCrudService(
			repository as unknown as Repository<Permission>,
			queryService as unknown as PermissionsQueryService,
		);
	});

	describe("create", () => {
		it("should create a permission and return a response DTO", async () => {
			const dto: PermissionsCreateDto = {
				action: CaslAction.READ,
				subject: CaslSubject.USERS,
				inverted: false,
			};
			const saved = makePermission();
			repository.create.mockReturnValue(saved);
			repository.save.mockResolvedValue(saved);

			const result = await service.create(dto);
			expect(result).toBeInstanceOf(PermissionsResponseDto);
		});
	});

	describe("update", () => {
		it("should update a permission and return a response DTO", async () => {
			const perm = makePermission();
			queryService.findOneByOrThrow.mockResolvedValue(perm);
			repository.merge.mockReturnValue({
				...perm,
				inverted: true,
			} as Permission);
			repository.save.mockResolvedValue({
				...perm,
				inverted: true,
			} as Permission);

			const result = await service.update("perm-uuid", { inverted: true });
			expect(result).toBeInstanceOf(PermissionsResponseDto);
		});

		it("should throw NotFoundException when permission not found", async () => {
			queryService.findOneByOrThrow.mockRejectedValue(new NotFoundException());
			await expect(service.update("missing", {})).rejects.toThrow(
				NotFoundException,
			);
		});
	});
});
