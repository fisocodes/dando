import {
	Between,
	LessThanOrEqual,
	MoreThanOrEqual,
	type Repository,
	type SelectQueryBuilder,
} from "typeorm";
import { BaseResponseDto } from "../dtos/base-response.dto";
import { BaseEntity } from "../entities/base.entity";
import { CursorPaginationDirection } from "../enums/cursor-pagination-direction.enum";
import { PaginationService } from "./pagination.service";

class TestEntity extends BaseEntity {}
class TestResponseDto extends BaseResponseDto {}
class TestPaginationService extends PaginationService<
	TestEntity,
	TestResponseDto
> {}

type MockQueryBuilder = {
	where: jest.Mock;
	andWhere: jest.Mock;
	orderBy: jest.Mock;
	take: jest.Mock;
	getMany: jest.Mock;
};

describe("PaginationService", () => {
	let service: TestPaginationService;
	let mockQueryBuilder: MockQueryBuilder;
	let repository: jest.Mocked<
		Pick<Repository<TestEntity>, "findAndCount" | "createQueryBuilder">
	>;

	const makeEntities = (count: number): TestEntity[] =>
		Array.from(
			{ length: count },
			(_, i) =>
				({
					id: `uuid-${i}`,
					createdAt: new Date(),
					updatedAt: new Date(),
					deletedAt: new Date(),
				}) as TestEntity,
		);

	beforeEach(() => {
		mockQueryBuilder = {
			where: jest.fn().mockReturnThis(),
			andWhere: jest.fn().mockReturnThis(),
			orderBy: jest.fn().mockReturnThis(),
			take: jest.fn().mockReturnThis(),
			getMany: jest.fn(),
		};

		repository = {
			findAndCount: jest.fn(),
			createQueryBuilder: jest
				.fn()
				.mockReturnValue(
					mockQueryBuilder as unknown as SelectQueryBuilder<TestEntity>,
				),
		};

		service = new TestPaginationService(
			repository as unknown as Repository<TestEntity>,
			TestResponseDto,
		);
	});

	describe("findWithOffset", () => {
		it("should return paginated response with correct metadata", async () => {
			repository.findAndCount.mockResolvedValue([makeEntities(5), 50]);
			const result = await service.findWithOffset({ page: 2, limit: 5 });

			expect(result.total).toBe(50);
			expect(result.page).toBe(2);
			expect(result.limit).toBe(5);
			expect(result.totalPages).toBe(10);
			expect(result.hasPreviousPage).toBe(true);
			expect(result.hasNextPage).toBe(true);
		});

		it("should indicate no next/previous page on the last page", async () => {
			repository.findAndCount.mockResolvedValue([makeEntities(3), 13]);
			const result = await service.findWithOffset({ page: 3, limit: 5 });

			expect(result.hasNextPage).toBe(false);
			expect(result.hasPreviousPage).toBe(true);
		});

		it("should calculate skip as (page - 1) * limit", async () => {
			repository.findAndCount.mockResolvedValue([[], 0]);
			await service.findWithOffset({ page: 3, limit: 10 });

			expect(repository.findAndCount).toHaveBeenCalledWith(
				expect.objectContaining({ skip: 20, take: 10 }),
			);
		});

		it("should apply Between when both createdAt dates are provided", async () => {
			repository.findAndCount.mockResolvedValue([[], 0]);
			const from = new Date("2024-01-01");
			const to = new Date("2024-12-31");
			await service.findWithOffset({
				page: 1,
				limit: 10,
				createdAtFrom: from,
				createdAtTo: to,
			});

			expect(repository.findAndCount).toHaveBeenCalledWith(
				expect.objectContaining({
					where: expect.objectContaining({ createdAt: Between(from, to) }),
				}),
			);
		});

		it("should apply MoreThanOrEqual when only createdAtFrom is provided", async () => {
			repository.findAndCount.mockResolvedValue([[], 0]);
			const from = new Date("2024-01-01");
			await service.findWithOffset({ page: 1, limit: 10, createdAtFrom: from });

			expect(repository.findAndCount).toHaveBeenCalledWith(
				expect.objectContaining({
					where: expect.objectContaining({ createdAt: MoreThanOrEqual(from) }),
				}),
			);
		});

		it("should apply LessThanOrEqual when only createdAtTo is provided", async () => {
			repository.findAndCount.mockResolvedValue([[], 0]);
			const to = new Date("2024-12-31");
			await service.findWithOffset({ page: 1, limit: 10, createdAtTo: to });

			expect(repository.findAndCount).toHaveBeenCalledWith(
				expect.objectContaining({
					where: expect.objectContaining({ createdAt: LessThanOrEqual(to) }),
				}),
			);
		});

		it("should map entities to response DTOs", async () => {
			repository.findAndCount.mockResolvedValue([makeEntities(2), 2]);
			const result = await service.findWithOffset({ page: 1, limit: 10 });
			expect(result.data.every((d) => d instanceof TestResponseDto)).toBe(true);
		});
	});

	describe("findWithCursor", () => {
		it("should return null cursors when there are no more items", async () => {
			mockQueryBuilder.getMany.mockResolvedValue(makeEntities(3));
			const result = await service.findWithCursor({
				limit: 5,
				direction: CursorPaginationDirection.NEXT,
			});

			expect(result.data).toHaveLength(3);
			expect(result.nextCursor).toBeNull();
			expect(result.previousCursor).toBeNull();
		});

		it("should set nextCursor to last item id when there are more items (NEXT)", async () => {
			const entities = makeEntities(4);
			const expectedCursor = entities[2].id;
			mockQueryBuilder.getMany.mockResolvedValue(entities);

			const result = await service.findWithCursor({
				limit: 3,
				direction: CursorPaginationDirection.NEXT,
			});

			expect(result.data).toHaveLength(3);
			expect(result.nextCursor).toBe(expectedCursor);
		});

		it("should set previousCursor to first item id after reverse when there are more items (PREVIOUS)", async () => {
			const entities = makeEntities(4);
			const expectedCursor = entities[2].id;
			mockQueryBuilder.getMany.mockResolvedValue(entities);

			const result = await service.findWithCursor({
				limit: 3,
				direction: CursorPaginationDirection.PREVIOUS,
			});

			expect(result.previousCursor).toBe(expectedCursor);
		});

		it("should add andWhere with > operator in NEXT direction", async () => {
			mockQueryBuilder.getMany.mockResolvedValue([]);
			await service.findWithCursor({
				cursor: "cursor-uuid",
				limit: 10,
				direction: CursorPaginationDirection.NEXT,
			});

			expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
				"entity.id > :cursor",
				{ cursor: "cursor-uuid" },
			);
		});

		it("should add andWhere with < operator in PREVIOUS direction", async () => {
			mockQueryBuilder.getMany.mockResolvedValue([]);
			await service.findWithCursor({
				cursor: "cursor-uuid",
				limit: 10,
				direction: CursorPaginationDirection.PREVIOUS,
			});

			expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
				"entity.id < :cursor",
				{ cursor: "cursor-uuid" },
			);
		});

		it("should map entities to response DTOs", async () => {
			mockQueryBuilder.getMany.mockResolvedValue(makeEntities(2));
			const result = await service.findWithCursor({
				limit: 10,
				direction: CursorPaginationDirection.NEXT,
			});
			expect(result.data.every((d) => d instanceof TestResponseDto)).toBe(true);
		});
	});
});
