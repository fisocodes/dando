import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { PaginationQueryDto } from "./pagination-query.dto";

const createDto = (data: Record<string, unknown> = {}): PaginationQueryDto =>
	plainToInstance(PaginationQueryDto, data);

const getErrors = async (data: Record<string, unknown> = {}) =>
	validate(createDto(data));

const VALID_UUID = faker.string.uuid();
const VALID_DATE = faker.date.anytime().toISOString();

describe("PaginationQueryDto", () => {
	describe("defaults", () => {
		it("should default limit to 10", () => {
			const dto = new PaginationQueryDto();
			expect(dto.limit).toBe(10);
		});

		it("should have all other fields undefined by default", () => {
			const dto = new PaginationQueryDto();
			expect(dto.id).toBeUndefined();
			expect(dto.search).toBeUndefined();
			expect(dto.createdAtFrom).toBeUndefined();
			expect(dto.createdAtTo).toBeUndefined();
			expect(dto.updatedAtFrom).toBeUndefined();
			expect(dto.updatedAtTo).toBeUndefined();
		});

		it("should pass validation with no fields provided", async () => {
			const errors = await getErrors();
			expect(errors).toHaveLength(0);
		});
	});

	describe("id", () => {
		it("should accept a valid UUID v4", async () => {
			const errors = await getErrors({ id: VALID_UUID });
			expect(errors).toHaveLength(0);
		});

		it("should reject a non-UUID string", async () => {
			const errors = await getErrors({ id: "not-a-uuid" });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("id");
			expect(errors[0].constraints).toHaveProperty("isUuid");
		});

		it("should reject an empty string as id", async () => {
			const errors = await getErrors({ id: "" });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("id");
		});
	});

	describe("search", () => {
		it("should accept a valid string", async () => {
			const errors = await getErrors({ search: "hello world" });
			expect(errors).toHaveLength(0);
		});

		it("should accept an empty string", async () => {
			const errors = await getErrors({ search: "" });
			expect(errors).toHaveLength(0);
		});

		it("should reject a non-string value", async () => {
			const errors = await getErrors({ search: 123 });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("search");
			expect(errors[0].constraints).toHaveProperty("isString");
		});
	});

	describe("createdAtFrom", () => {
		it("should accept a valid ISO date string", async () => {
			const errors = await getErrors({ createdAtFrom: VALID_DATE });
			expect(errors).toHaveLength(0);
		});

		it("should reject an invalid date string", async () => {
			const errors = await getErrors({ createdAtFrom: "not-a-date" });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("createdAtFrom");
			expect(errors[0].constraints).toHaveProperty("isDateString");
		});
	});

	describe("createdAtTo", () => {
		it("should accept a valid ISO date string", async () => {
			const errors = await getErrors({ createdAtTo: VALID_DATE });
			expect(errors).toHaveLength(0);
		});

		it("should reject an invalid date string", async () => {
			const errors = await getErrors({ createdAtTo: "not-a-date" });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("createdAtTo");
			expect(errors[0].constraints).toHaveProperty("isDateString");
		});
	});

	describe("updatedAtFrom", () => {
		it("should accept a valid ISO date string", async () => {
			const errors = await getErrors({ updatedAtFrom: VALID_DATE });
			expect(errors).toHaveLength(0);
		});

		it("should reject an invalid date string", async () => {
			const errors = await getErrors({ updatedAtFrom: "not-a-date" });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("updatedAtFrom");
			expect(errors[0].constraints).toHaveProperty("isDateString");
		});
	});

	describe("updatedAtTo", () => {
		it("should accept a valid ISO date string", async () => {
			const errors = await getErrors({ updatedAtTo: VALID_DATE });
			expect(errors).toHaveLength(0);
		});

		it("should reject an invalid date string", async () => {
			const errors = await getErrors({ updatedAtTo: "not-a-date" });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("updatedAtTo");
			expect(errors[0].constraints).toHaveProperty("isDateString");
		});
	});

	describe("limit", () => {
		it("should accept the minimum boundary value of 1", async () => {
			const errors = await getErrors({ limit: 1 });
			expect(errors).toHaveLength(0);
		});

		it("should accept the maximum boundary value of 200", async () => {
			const errors = await getErrors({ limit: 200 });
			expect(errors).toHaveLength(0);
		});

		it("should accept a value within bounds", async () => {
			const errors = await getErrors({ limit: 50 });
			expect(errors).toHaveLength(0);
		});

		it("should reject a value below the minimum (0)", async () => {
			const errors = await getErrors({ limit: 0 });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("limit");
			expect(errors[0].constraints).toHaveProperty("min");
		});

		it("should reject a negative value", async () => {
			const errors = await getErrors({ limit: -1 });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("limit");
			expect(errors[0].constraints).toHaveProperty("min");
		});

		it("should reject a value above the maximum (201)", async () => {
			const errors = await getErrors({ limit: 201 });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("limit");
			expect(errors[0].constraints).toHaveProperty("max");
		});

		it("should reject a float value", async () => {
			const errors = await getErrors({ limit: 10.5 });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("limit");
			expect(errors[0].constraints).toHaveProperty("isInt");
		});

		it("should reject a string value", async () => {
			const errors = await getErrors({ limit: "ten" });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("limit");
		});
	});

	describe("combined fields", () => {
		it("should pass validation with all valid fields provided", async () => {
			const errors = await getErrors({
				id: VALID_UUID,
				search: "query",
				createdAtFrom: VALID_DATE,
				createdAtTo: VALID_DATE,
				updatedAtFrom: VALID_DATE,
				updatedAtTo: VALID_DATE,
				limit: 25,
			});
			expect(errors).toHaveLength(0);
		});

		it("should report all errors when multiple fields are invalid", async () => {
			const errors = await getErrors({
				id: "bad-id",
				limit: 0,
			});
			expect(errors).toHaveLength(2);
			const properties = errors.map((e) => e.property);
			expect(properties).toContain("id");
			expect(properties).toContain("limit");
		});
	});
});
