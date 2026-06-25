import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UsersRolesOffsetQueryDto } from "./users-roles-offset-pagination-query.dto";

const getErrors = async (data: Partial<UsersRolesOffsetQueryDto> = {}) =>
	validate(plainToInstance(UsersRolesOffsetQueryDto, data));

describe("UsersRolesOffsetQueryDto", () => {
	it("should pass with no fields", async () => {
		expect(await getErrors()).toHaveLength(0);
	});

	it("should accept valid UUID fields", async () => {
		expect(
			await getErrors({
				userId: faker.string.uuid(),
				roleId: faker.string.uuid(),
			}),
		).toHaveLength(0);
	});

	it("should reject a non-UUID userId", async () => {
		const errors = await getErrors({ userId: "bad" });
		expect(errors).toHaveLength(1);
		expect(errors[0].property).toBe("userId");
	});
});
