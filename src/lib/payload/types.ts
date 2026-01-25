export type TenantUser = {
	tenant?: string | { id: string }
	role: "super-admin" | "user"
	email?: string
}
