import { CollectionConfig } from "payload"
import { getUserTenantID } from "../utils"
import { TenantUser } from "../types"

export const AboutSections: CollectionConfig = {
	slug: "about_business",

	hooks: {
		beforeValidate: [
			async ({ data, req, operation }) => {
				if (operation === "create") {
					let tenantId = data?.tenant

					if (!tenantId && req.user) {
						tenantId = getUserTenantID(req.user as TenantUser)
					}

					if (tenantId) {
						const existing = await req.payload.find({
							collection: "about_business",
							where: {
								tenant: {
									equals: tenantId
								}
							},
							limit: 0,
							depth: 0
						})

						console.log(`Checking for existing about section for tenant ${tenantId}:`, existing.totalDocs)

						if (existing.totalDocs > 0) {
							throw new Error(`This tenant (${tenantId}) already has an About Section`)
						}

						data = { ...data, tenant: tenantId }
					}
				}

				return data
			}
		]
	},

	access: {
		// Fix: Handle null user
		create: ({ req }) => {
			if (!req.user) return false

			const tenantId = getUserTenantID(req.user as TenantUser)

			// Check if user has a tenant
			if (!tenantId) return false

			// Return a promise that resolves to boolean
			return (async () => {
				try {
					const existing = await req.payload.find({
						collection: "about_business",
						where: {
							tenant: {
								equals: tenantId
							}
						},
						limit: 0,
						depth: 0
					})

					// Allow create ONLY if no existing about section
					return existing.totalDocs === 0
				} catch (error) {
					console.error("Error checking existing about section:", error)

					return false
				}
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
		delete: ({ req }) => {
			if (!req.user) return false

			const tenantId = getUserTenantID(req.user as TenantUser)

			return {
				tenant: {
					equals: tenantId
				}
			}
		}
	},

	fields: [
		{
			name: "description",
			type: "textarea",
			required: true,
			maxLength: 160,
			admin: {
				description: "Max 160 characters"
			},
			localized: true
		}
	]
}
