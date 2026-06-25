import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { RolesPermissionsCursorQueryDto } from "./roles-permissions-cursor-pagination-query.dto";

const getErrors = async (data: Partial<RolesPermissionsCursorQueryDto> = {}) =>
	validate(plainToInstance(RolesPermissionsCursorQueryDto, data));

describe("RolesPermissionsCursorQueryDto", () => {
	it("should pass with no fields", async () => {
		expect(await getErrors()).toHaveLength(0);
	});

	it("should accept valid UUID fields", async () => {
		expect(
			await getErrors({
				roleId: faker.string.uuid(),
				permissionId: faker.string.uuid(),
			}),
		).toHaveLength(0);
	});

	it("should reject a non-UUID roleId", async () => {
		const errors = await getErrors({ roleId: "bad" });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("roleId");
		expect(errors[0].constraints).toHaveProperty("isUuid");
	});

	it("should reject a non-UUID permissionId", async () => {
		const errors = await getErrors({ permissionId: "bad" });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("permissionId");
		expect(errors[0].constraints).toHaveProperty("isUuid");
	});
});
