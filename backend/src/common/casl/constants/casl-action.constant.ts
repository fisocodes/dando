export const CaslAction = {
	MANAGE: "manage",
	CREATE: "create",
	READ: "read",
	UPDATE: "update",
	DELETE: "delete",
} as const;

export type CaslAction = (typeof CaslAction)[keyof typeof CaslAction];
