import type { Repository } from "typeorm";
import type { CursorPaginationQueryDto } from "../dtos/cursor-pagination-query.dto";
import type { CursorPaginationResponseDto } from "../dtos/cursor-pagination-response.dto";
import type { OffsetPaginationQueryDto } from "../dtos/offset-pagination-query.dto";
import type { OffsetPaginationResponseDto } from "../dtos/offset-pagination-response.dto";
import type { BaseEntity } from "../entities/base.entity";
import { CursorPaginationDirection } from "../enums/cursor-pagination-direction.enum";

export abstract class PaginationService<T extends BaseEntity, ResponseDto> {
	constructor(protected readonly repository: Repository<T>) {}

	async findWithOffset(
		query: OffsetPaginationQueryDto,
	): Promise<OffsetPaginationResponseDto<ResponseDto>> {
		const { page, limit } = query;
		const skip = (page - 1) * limit;

		const [entities, total] = await this.repository.findAndCount({
			skip,
			take: limit,
		});

		const totalPages = Math.ceil(total / limit);

		return {
			data: entities.map((entity) => this.toResponse(entity)),
			total,
			page,
			limit,
			totalPages,
			hasNextPage: page < totalPages,
			hasPreviousPage: page > 1,
		};
	}

	async findWithCursor(
		query: CursorPaginationQueryDto,
	): Promise<CursorPaginationResponseDto<ResponseDto>> {
		const { cursor, limit, direction } = query;

		const queryBuilder = this.repository.createQueryBuilder("entity");

		if (cursor) {
			if (direction === CursorPaginationDirection.NEXT) {
				queryBuilder.where("entity.id > :cursor", { cursor });
			} else {
				queryBuilder.where("entity.id < :cursor", { cursor });
			}
		}

		queryBuilder
			.orderBy(
				"entity.id",
				direction === CursorPaginationDirection.NEXT ? "ASC" : "DESC",
			)
			.take(limit + 1);

		const entities = await queryBuilder.getMany();
		const hasMore = entities.length > limit;
		if (hasMore) entities.pop();

		if (direction === CursorPaginationDirection.PREVIOUS) entities.reverse();

		return {
			data: entities.map((entity) => this.toResponse(entity)),
			nextCursor:
				hasMore && direction === CursorPaginationDirection.NEXT
					? entities[entities.length - 1].id
					: null,
			previousCursor:
				hasMore && direction === CursorPaginationDirection.PREVIOUS
					? entities[0].id
					: null,
		};
	}

	abstract toResponse(entity: T): ResponseDto;
}
