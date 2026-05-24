export const CaslSubject = {
	USERS: "users",
	ROLES: "roles",
	PERMISSIONS: "permissions",
} as const;
export type CaslSubject = (typeof CaslSubject)[keyof typeof CaslSubject];
