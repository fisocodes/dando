export const CaslSubject = {
	USERS: "users",
	ROLES: "roles",
	PERMISSIONS: "permissions",
	ROLES_PERMISSIONS: "roles_permissions",
	USERS_ROLES: "users_roles",
	OTPS: "otps",
} as const;
export type CaslSubject = (typeof CaslSubject)[keyof typeof CaslSubject];
