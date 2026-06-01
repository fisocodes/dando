export const CaslSubject = {
	USERS: "users",
	ROLES: "roles",
	PERMISSIONS: "permissions",
	ROLES_PERMISSIONS: "roles_permissions",
} as const;
export type CaslSubject = (typeof CaslSubject)[keyof typeof CaslSubject];
