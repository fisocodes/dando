import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { RolesPermissionsCreateDto } from "./roles-permissions-create.dto";

const getErrors = async (data: Partial<RolesPermissionsCreateDto> = {}) =>
	validate(plainToInstance(RolesPermissionsCreateDto, data));

const VALID = {
	roleId: faker.string.uuid(),
	permissionId: faker.string.uuid(),
};

describe("RolesPermissionsCreateDto", () => {
	it("should accept valid UUIDs", async () => {
		expect(await getErrors(VALID)).toHaveLength(0);
	});

	it("should reject a missing roleId", async () => {
		const errors = await getErrors({ permissionId: VALID.permissionId });
		expect(errors.some((e) => e.property === "roleId")).toBe(true);
	});

	it("should reject a non-UUID roleId", async () => {
		const errors = await getErrors({ ...VALID, roleId: "not-a-uuid" });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("roleId");
		expect(errors[0].constraints).toHaveProperty("isUuid");
	});

	it("should reject a non-UUID permissionId", async () => {
		const errors = await getErrors({ ...VALID, permissionId: "not-a-uuid" });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("permissionId");
		expect(errors[0].constraints).toHaveProperty("isUuid");
	});
});
