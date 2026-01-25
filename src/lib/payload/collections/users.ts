import { isSuperAdmin } from "@/lib/payload/access"
import { ValidationError, type CollectionConfig } from "payload"
import type { TenantUser } from "../types"

const Users: CollectionConfig = {
	slug: "users",
	auth: true,
	admin: {
		useAsTitle: "email"
	},
	access: {
		read: ({ req }) => isSuperAdmin(req.user as TenantUser),
		create: ({ req }) => isSuperAdmin(req.user as TenantUser),
		update: ({ req }) => isSuperAdmin(req.user as TenantUser),
		delete: ({ req }) => isSuperAdmin(req.user as TenantUser)
	},
	fields: [
		{
			name: "role",
			type: "select",
			defaultValue: "user",
			options: ["super-admin", "user"],
			access: {
				update: ({ req }) => isSuperAdmin(req.user as TenantUser)
			},
			admin: {
				position: "sidebar",
				hidden: true
			}
		},
		{
			name: "tenant",
			type: "relationship",
			relationTo: "tenants",
			required: false,
			admin: {
				condition: (_, __, { user }) => user?.role === "super-admin",
				position: "sidebar"
			}
		}
	],
	hooks: {
		beforeValidate: [
			async ({ data, req, operation }) => {
				if (
					(operation === "create" || operation === "update" || data?.password) &&
					typeof data?.password === "string"
				) {
					const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/

					if (!passwordRegex.test(data.password)) {
						throw new ValidationError({
							errors: [
								{
									path: "password",
									message: "Password must be at least 8 characters long and include a number and a special character."
								}
							]
						})
					}
				}

				if (operation === "create") {
					const count = await req.payload.count({ collection: "users" })

					// First ever user = super admin
					if (count.totalDocs === 0) {
						data!.role = "super-admin"
					}
				}

				return data
			}
		]
	}
}

export default Users
