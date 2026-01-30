import { CollectionConfig } from "payload"
import { isSuperAdmin } from "../access"
import { TenantUser } from "../types"

export const Configuration: CollectionConfig = {
	slug: "configuration",
	dbName: "tenant_link_configuration",
	labels: {
		singular: "Configuration",
		plural: "Configuration Links"
	},
	admin: {
		useAsTitle: "staticUrl",
		hidden: ({ user }) => !isSuperAdmin(user as unknown as TenantUser)
	},
	access: {
		create: ({ req }) => isSuperAdmin(req.user as TenantUser),
		read: () => true,
		update: ({ req }) => isSuperAdmin(req.user as TenantUser),
		delete: ({ req }) => isSuperAdmin(req.user as TenantUser)
	},
	fields: [
		{
			name: "tenant",
			type: "relationship",
			relationTo: "tenants",
			required: true,
			label: "Tenant"
		},
		{
			name: "staticUrl",
			type: "text",
			required: true,
			label: "URL",
			admin: {
				description: "Example: https://domain.com/{tenantId}"
			}
		},
		// {
		// 	name: "mappedUrl",
		// 	type: "text",
		// 	required: false,
		// 	label: "Mapped URL (optional)",
		// 	admin: {
		// 		description: "If filled, redirect will go here instead of static URL."
		// 	}
		// },
		{
			name: "qrUrl",
			type: "text",
			label: "QR URL",
			admin: {
				readOnly: true,
				position: "sidebar",
				description: "Auto-generated QR URL"
			}
		},
		{
			name: "qrPreview",
			type: "ui",
			admin: {
				position: "sidebar",
				components: {
					Field: "@/components/payload/QrPreview"
				}
			}
		}
	],
	hooks: {
		beforeChange: [
			({ data }) => {
				if (!data?.tenant) return data

				const tenantId = typeof data.tenant === "string" ? data.tenant : data.tenant?.id || data.tenant?.value

				if (tenantId && data.staticUrl) {
					let finalUrl = data.mappedUrl || data.staticUrl

					if (!data.mappedUrl && data.staticUrl.includes("{tenantId}")) {
						finalUrl = data.staticUrl.replace("{tenantId}", tenantId)
					}

					data.qrUrl = finalUrl
				}

				return data
			}
		]
	}
}
