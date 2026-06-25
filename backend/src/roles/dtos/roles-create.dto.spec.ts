import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { RolesCreateDto } from "./roles-create.dto";

const getErrors = async (data: Record<string, unknown> = {}) =>
	validate(plainToInstance(RolesCreateDto, data));

describe("RolesCreateDto", () => {
	it("should default priority to 0", () => {
		expect(new RolesCreateDto().priority).toBe(0);
	});

	it("should accept a valid name", async () => {
		expect(await getErrors({ name: "admin" })).toHaveLength(0);
	});

	it("should accept all optional fields", async () => {
		expect(
			await getErrors({
				name: "admin",
				description: "Admin role",
				priority: 5,
			}),
		).toHaveLength(0);
	});

	describe("name", () => {
		it("should reject an empty name", async () => {
			const errors = await getErrors({ name: "" });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("name");
			expect(errors[0].constraints).toHaveProperty("isNotEmpty");
		});

		it("should reject a missing name", async () => {
			const errors = await getErrors({});
			expect(errors.some((e) => e.property === "name")).toBe(true);
		});

		it("should reject a non-string name", async () => {
			const errors = await getErrors({ name: 123 });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("name");
			expect(errors[0].constraints).toHaveProperty("isString");
		});
	});

	describe("priority", () => {
		it("should accept priority 0", async () => {
			expect(await getErrors({ name: "admin", priority: 0 })).toHaveLength(0);
		});

		it("should reject a negative priority", async () => {
			const errors = await getErrors({ name: "admin", priority: -1 });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("priority");
			expect(errors[0].constraints).toHaveProperty("min");
		});

		it("should reject a float priority", async () => {
			const errors = await getErrors({ name: "admin", priority: 1.5 });
			expect(errors).toHaveLength(1);
			expect(errors[0].property).toBe("priority");
			expect(errors[0].constraints).toHaveProperty("isInt");
		});
	});
});
