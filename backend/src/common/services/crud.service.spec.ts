import { NotFoundException } from "@nestjs/common";
import {
	type DeepPartial,
	type FindOptionsWhere,
	type Repository,
} from "typeorm";
import { BaseResponseDto } from "../dtos/base-response.dto";
import { BaseEntity } from "../entities/base.entity";
import { CrudService } from "./crud.service";
import type { QueryService } from "./query.service";

class TestEntity extends BaseEntity {
	name!: string;
}
class TestResponseDto extends BaseResponseDto {}

class TestCrudService extends CrudService<
	TestEntity,
	{ name: string },
	{ name?: string },
	TestResponseDto
> {
	async create(dto: { name: string }): Promise<TestResponseDto> {
		const entity = this.repository.create(
			dto as DeepPartial<TestEntity>,
		) as unknown as TestEntity;
		return this.toResponse(await this.repository.save(entity));
	}

	async update(id: string, dto: { name?: string }): Promise<TestResponseDto> {
		const entity = await this.queryService.findOneByOrThrow({
			id,
		} as FindOptionsWhere<TestEntity>);
		return this.toResponse(
			await this.repository.save(
				this.repository.merge(entity, dto as DeepPartial<TestEntity>),
			),
		);
	}
}

describe("CrudService", () => {
	let service: TestCrudService;
	let repository: jest.Mocked<
		Pick<Repository<TestEntity>, "save" | "softRemove" | "create" | "merge">
	>;
	let queryService: jest.Mocked<
		Pick<QueryService<TestEntity>, "findOneByOrThrow">
	>;

	const makeEntity = (overrides: Partial<TestEntity> = {}): TestEntity =>
		({
			id: "uuid-1",
			name: "test",
			createdAt: new Date(),
			updatedAt: new Date(),
			...overrides,
		}) as TestEntity;

	beforeEach(() => {
		repository = {
			save: jest.fn(),
			softRemove: jest.fn(),
			create: jest.fn(),
			merge: jest.fn(),
		};
		queryService = { findOneByOrThrow: jest.fn() };
		service = new TestCrudService(
			repository as unknown as Repository<TestEntity>,
			queryService as unknown as QueryService<TestEntity>,
			TestResponseDto,
		);
	});

	describe("read", () => {
		it("should return a response DTO when entity is found", async () => {
			const entity = makeEntity();
			queryService.findOneByOrThrow.mockResolvedValue(entity);
			const result = await service.read("uuid-1");
			expect(queryService.findOneByOrThrow).toHaveBeenCalledWith({
				id: "uuid-1",
			});
			expect(result).toBeInstanceOf(TestResponseDto);
		});

		it("should propagate NotFoundException from queryService", async () => {
			queryService.findOneByOrThrow.mockRejectedValue(new NotFoundException());
			await expect(service.read("missing")).rejects.toThrow(NotFoundException);
		});
	});

	describe("delete", () => {
		it("should call softRemove on the found entity", async () => {
			const entity = makeEntity();
			queryService.findOneByOrThrow.mockResolvedValue(entity);
			repository.softRemove.mockResolvedValue(entity);
			await service.delete("uuid-1");
			expect(repository.softRemove).toHaveBeenCalledWith(entity);
		});

		it("should propagate NotFoundException when entity not found", async () => {
			queryService.findOneByOrThrow.mockRejectedValue(new NotFoundException());
			await expect(service.delete("missing")).rejects.toThrow(
				NotFoundException,
			);
		});
	});

	describe("toResponse", () => {
		it("should transform entity into the response DTO class", async () => {
			const entity = makeEntity();
			queryService.findOneByOrThrow.mockResolvedValue(entity);
			const result = await service.read("uuid-1");
			expect(result).toBeInstanceOf(TestResponseDto);
			expect(result.id).toBe(entity.id);
		});
	});
});
