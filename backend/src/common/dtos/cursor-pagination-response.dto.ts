export abstract class CursorPaginationResponseDto<T> {
	data!: T[];
	nextCursor!: string | null;
	previousCursor!: string | null;
}
