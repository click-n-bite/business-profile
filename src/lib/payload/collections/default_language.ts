import { CollectionConfig } from "payload"
import { getUserTenantID } from "../utils"
import { TenantUser } from "../types"

export const DefaultLanguage: CollectionConfig = {
	slug: "default-language",
	labels: {
		singular: "Default Language",
		plural: "Default Languages"
	},
	admin: {
		useAsTitle: "language"
	},

	hooks: {
		beforeValidate: [
			async ({ data, req, operation }) => {
				if (req.user && !data?.tenant) {
					const tenantId = getUserTenantID(req.user as TenantUser)

					if (tenantId) {
						data = { ...data, tenant: tenantId }
					}
				}

				if (operation === "create") {
					const tenantId = data?.tenant || getUserTenantID(req.user as TenantUser)

					if (tenantId) {
						const existing = await req.payload.find({
							collection: "default-language",
							where: {
								tenant: {
									equals: tenantId
								}
							},
							limit: 0
						})

						if (existing.totalDocs > 0) {
							throw new Error("This tenant already has a default language configured")
						}
					}
				}

				return data
			}
		]
	},

	access: {
		create: ({ req }) => {
			if (!req.user) return false

			const tenantId = getUserTenantID(req.user as TenantUser)

			if (!tenantId) return false

			return (async () => {
				const existing = await req.payload.find({
					collection: "default-language",
					where: {
						tenant: {
							equals: tenantId
						}
					},
					limit: 0
				})

				return existing.totalDocs === 0
			})()
		},
		read: ({ req }) => {
			if (!req.user) return false

			const tenantId = getUserTenantID(req.user as TenantUser)

			return {
				tenant: {
					equals: tenantId
				}
			}
		},
		update: ({ req }) => {
			if (!req.user) return false

			const tenantId = getUserTenantID(req.user as TenantUser)

			return {
				tenant: {
					equals: tenantId
				}
			}
		},
		delete: () => true
	},

	fields: [
		{
			name: "language",
			type: "select",
			required: true,
			label: "Default Language",
			options: [
				{ label: "🇺🇸 English", value: "en" },
				{ label: "🇸🇦 العربية", value: "ar" }
			]
		}
	]
}
