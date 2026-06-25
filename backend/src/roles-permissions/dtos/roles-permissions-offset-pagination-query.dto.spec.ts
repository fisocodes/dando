import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { RolesPermissionsOffsetQueryDto } from "./roles-permissions-offset-pagination-query.dto";

const getErrors = async (data: Partial<RolesPermissionsOffsetQueryDto> = {}) =>
	validate(plainToInstance(RolesPermissionsOffsetQueryDto, data));

describe("RolesPermissionsOffsetQueryDto", () => {
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
	});
});
