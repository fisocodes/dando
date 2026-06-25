import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UsersRolesCreateDto } from "./users-roles-create.dto";

const getErrors = async (data: Partial<UsersRolesCreateDto> = {}) =>
	validate(plainToInstance(UsersRolesCreateDto, data));

const VALID = {
	userId: faker.string.uuid(),
	roleId: faker.string.uuid(),
};

describe("UsersRolesCreateDto", () => {
	it("should accept valid UUIDs", async () => {
		expect(await getErrors(VALID)).toHaveLength(0);
	});

	it("should reject a non-UUID userId", async () => {
		const errors = await getErrors({ ...VALID, userId: "not-a-uuid" });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("userId");
		expect(errors[0].constraints).toHaveProperty("isUuid");
	});

	it("should reject a non-UUID roleId", async () => {
		const errors = await getErrors({ ...VALID, roleId: "not-a-uuid" });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("roleId");
		expect(errors[0].constraints).toHaveProperty("isUuid");
	});
});
