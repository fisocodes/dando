import { plainToInstance } from "class-transformer";
import {
	Between,
	type FindOptionsWhere,
	LessThanOrEqual,
	MoreThanOrEqual,
	type Repository,
} from "typeorm";
import { BaseResponseDto } from "../dtos/base-response.dto";
import type { CursorPaginationQueryDto } from "../dtos/cursor-pagination-query.dto";
import type { CursorPaginationResponseDto } from "../dtos/cursor-pagination-response.dto";
import type { OffsetPaginationQueryDto } from "../dtos/offset-pagination-query.dto";
import type { OffsetPaginationResponseDto } from "../dtos/offset-pagination-response.dto";
import type { BaseEntity } from "../entities/base.entity";
import { CursorPaginationDirection } from "../enums/cursor-pagination-direction.enum";

export abstract class PaginationService<
	T extends BaseEntity,
	ResponseDto extends BaseResponseDto,
> {
	constructor(
		protected readonly repository: Repository<T>,
		protected readonly responseDtoClass: new () => ResponseDto,
	) {}

	protected buildSearchFilter(
		_search: string,
	): FindOptionsWhere<T> | FindOptionsWhere<T>[] {
		return {};
	}

	private buildFilters(query: Record<string, unknown>) {
		const {
			createdAtFrom,
			createdAtTo,
			updatedAtFrom,
			updatedAtTo,
			search,
			...rest
		} = query;
		const filters: Record<string, unknown> = { ...rest };

		if (createdAtFrom && createdAtTo) {
			filters.createdAt = Between(createdAtFrom as Date, createdAtTo as Date);
		} else if (createdAtFrom) {
			filters.createdAt = MoreThanOrEqual(createdAtFrom as Date);
		} else if (createdAtTo) {
			filters.createdAt = LessThanOrEqual(createdAtTo as Date);
		}

		if (updatedAtFrom && updatedAtTo) {
			filters.updatedAt = Between(updatedAtFrom as Date, updatedAtTo as Date);
		} else if (updatedAtFrom) {
			filters.updatedAt = MoreThanOrEqual(updatedAtFrom as Date);
		} else if (updatedAtTo) {
			filters.updatedAt = LessThanOrEqual(updatedAtTo as Date);
		}

		if (search) {
			const searchFilter = this.buildSearchFilter(search as string);
			if (Array.isArray(searchFilter)) {
				return searchFilter.map((f) => ({
					...filters,
					...f,
				})) as unknown as Record<string, unknown>;
			}
			Object.assign(filters, searchFilter);
		}

		return filters;
	}

	async findWithOffset<QueryDto extends OffsetPaginationQueryDto>(
		query: QueryDto,
	): Promise<OffsetPaginationResponseDto<ResponseDto>> {
		const { page, limit, ...filters } = query;
		const skip = (page - 1) * limit;

		const [entities, total] = await this.repository.findAndCount({
			skip,
			take: limit,
			where: this.buildFilters(filters) as FindOptionsWhere<T>,
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

	async findWithCursor<QueryDto extends CursorPaginationQueryDto>(
		query: QueryDto,
	): Promise<CursorPaginationResponseDto<ResponseDto>> {
		const { cursor, limit, direction, ...filters } = query;

		const queryBuilder = this.repository.createQueryBuilder("entity");

		if (Object.keys(filters).length > 0) {
			queryBuilder.where(this.buildFilters(filters) as FindOptionsWhere<T>);
		}

		if (cursor) {
			if (direction === CursorPaginationDirection.NEXT) {
				queryBuilder.andWhere("entity.id > :cursor", { cursor });
			} else {
				queryBuilder.andWhere("entity.id < :cursor", { cursor });
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

	protected toResponse(entity: T): ResponseDto {
		return plainToInstance(this.responseDtoClass, entity);
	}
}
