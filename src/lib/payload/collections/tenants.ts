import { CollectionConfig } from "payload"
import { isSuperAdmin } from "../access"
import { TenantUser } from "../types"

export const Tenants: CollectionConfig = {
	slug: "tenants",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "slug", "phone", "domain", "updatedAt"],
		hidden: ({ user }) => !isSuperAdmin(user as unknown as TenantUser)
	},
	access: {
		create: ({ req }) => isSuperAdmin(req.user as TenantUser),
		read: () => true,
		update: ({ req }) => isSuperAdmin(req.user as TenantUser),
		delete: ({ req }) => isSuperAdmin(req.user as TenantUser)
	},
	versions: {
		drafts: true
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true
		},
		{
			name: "slug",
			type: "text",
			required: true,
			unique: true,
			index: true,
			admin: {
				description: "Used for URLs. Example: /[slug]"
			}
		},
		{
			name: "whish_channel",
			type: "text",
			admin: {
				description: "Whish payment channel ID"
			}
		},
		{
			name: "whish_secret",
			type: "text",
			admin: {
				description: "Whish secret key"
			}
		},
		{
			name: "whish_website_url",
			type: "text",
			admin: {
				description: "Whish website callback / redirect URL"
			}
		},
		{
			name: "whish_percent",
			type: "number",
			admin: {
				step: 0.01
			},
			min: 0,
			max: 100
		}
	]
} satisfies CollectionConfig
