import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CursorPaginationDirection } from "../enums/cursor-pagination-direction.enum";
import { CursorPaginationQueryDto } from "./cursor-pagination-query.dto";

const getErrors = async (data: Record<string, unknown> = {}) =>
	validate(plainToInstance(CursorPaginationQueryDto, data));

describe("CursorPaginationQueryDto", () => {
	describe("defaults", () => {
		it("should default direction to NEXT", () => {
			expect(new CursorPaginationQueryDto().direction).toBe(
				CursorPaginationDirection.NEXT,
			);
		});

		it("should pass validation with no fields", async () => {
			expect(await getErrors()).toHaveLength(0);
		});
	});

	describe("cursor", () => {
		it("should accept a valid UUID", async () => {
			expect(await getErrors({ cursor: faker.string.uuid() })).toHaveLength(0);
		});

		it("should reject an invalid UUID", async () => {
			const errors = await getErrors({ cursor: "not-a-uuid" });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("cursor");
			expect(errors[0].constraints).toHaveProperty("isUuid");
		});
	});

	describe("direction", () => {
		it("should accept NEXT", async () => {
			expect(
				await getErrors({ direction: CursorPaginationDirection.NEXT }),
			).toHaveLength(0);
		});

		it("should accept PREVIOUS", async () => {
			expect(
				await getErrors({ direction: CursorPaginationDirection.PREVIOUS }),
			).toHaveLength(0);
		});

		it("should reject an invalid enum value", async () => {
			const errors = await getErrors({ direction: "INVALID" });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("direction");
			expect(errors[0].constraints).toHaveProperty("isEnum");
		});
	});
});
