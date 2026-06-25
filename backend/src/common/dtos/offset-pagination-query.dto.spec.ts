import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { OffsetPaginationQueryDto } from "./offset-pagination-query.dto";

const getErrors = async (data: Partial<OffsetPaginationQueryDto> = {}) =>
	validate(plainToInstance(OffsetPaginationQueryDto, data));

describe("OffsetPaginationQueryDto", () => {
	describe("defaults", () => {
		it("should default page to 1", () => {
			expect(new OffsetPaginationQueryDto().page).toBe(1);
		});

		it("should pass validation with no fields", async () => {
			expect(await getErrors()).toHaveLength(0);
		});
	});

	describe("page", () => {
		it("should accept page 1", async () => {
			expect(await getErrors({ page: 1 })).toHaveLength(0);
		});

		it("should accept page 100", async () => {
			expect(await getErrors({ page: 100 })).toHaveLength(0);
		});

		it("should reject page 0", async () => {
			const errors = await getErrors({ page: 0 });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("page");
			expect(errors[0].constraints).toHaveProperty("min");
		});

		it("should reject a float page", async () => {
			const errors = await getErrors({ page: 1.5 });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("page");
			expect(errors[0].constraints).toHaveProperty("isInt");
		});
	});
});
