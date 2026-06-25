import { ConflictException, NotFoundException } from "@nestjs/common";
import { type FindOptionsWhere, type Repository } from "typeorm";
import { BaseEntity } from "../entities/base.entity";
import { QueryService } from "./query.service";

class TestEntity extends BaseEntity {}
class TestQueryService extends QueryService<TestEntity> {}

describe("QueryService", () => {
	let service: TestQueryService;
	let repository: jest.Mocked<
		Pick<Repository<TestEntity>, "findOneBy" | "findBy">
	>;

	beforeEach(() => {
		repository = { findOneBy: jest.fn(), findBy: jest.fn() };
		service = new TestQueryService(
			repository as unknown as Repository<TestEntity>,
		);
	});

	describe("findOneBy", () => {
		it("should delegate to repository.findOneBy and return the result", async () => {
			const entity = { id: "1" } as TestEntity;
			repository.findOneBy.mockResolvedValue(entity);
			const result = await service.findOneBy({
				id: "1",
			} as FindOptionsWhere<TestEntity>);
			expect(repository.findOneBy).toHaveBeenCalledWith({ id: "1" });
			expect(result).toBe(entity);
		});

		it("should return null when not found", async () => {
			repository.findOneBy.mockResolvedValue(null);
			expect(
				await service.findOneBy({ id: "1" } as FindOptionsWhere<TestEntity>),
			).toBeNull();
		});
	});

	describe("findOneByOrThrow", () => {
		it("should return the entity when found", async () => {
			const entity = { id: "1" } as TestEntity;
			repository.findOneBy.mockResolvedValue(entity);
			await expect(
				service.findOneByOrThrow({ id: "1" } as FindOptionsWhere<TestEntity>),
			).resolves.toBe(entity);
		});

		it("should throw NotFoundException when entity is not found", async () => {
			repository.findOneBy.mockResolvedValue(null);
			await expect(
				service.findOneByOrThrow({ id: "1" } as FindOptionsWhere<TestEntity>),
			).rejects.toThrow(NotFoundException);
		});
	});

	describe("findManyBy", () => {
		it("should delegate to repository.findBy and return results", async () => {
			const entities = [{ id: "1" }, { id: "2" }] as TestEntity[];
			repository.findBy.mockResolvedValue(entities);
			const result = await service.findManyBy(
				{} as FindOptionsWhere<TestEntity>,
			);
			expect(result).toEqual(entities);
		});
	});

	describe("throwIfConflictsWith", () => {
		it("should resolve without throwing when entity does not exist", async () => {
			repository.findOneBy.mockResolvedValue(null);
			await expect(
				service.throwIfConflictsWith({} as FindOptionsWhere<TestEntity>),
			).resolves.toBeUndefined();
		});

		it("should throw ConflictException when entity already exists", async () => {
			repository.findOneBy.mockResolvedValue({ id: "1" } as TestEntity);
			await expect(
				service.throwIfConflictsWith({} as FindOptionsWhere<TestEntity>),
			).rejects.toThrow(ConflictException);
		});
	});
});
