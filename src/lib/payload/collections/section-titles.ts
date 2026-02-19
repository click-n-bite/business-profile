/* eslint-disable @typescript-eslint/no-explicit-any */
// import { CollectionConfig } from "payload"

// export const SectionTitles: CollectionConfig = {
// 	slug: "section_titles",
// 	labels: {
// 		singular: "Section Title",
// 		plural: "Section Titles"
// 	},
// 	admin: {
// 		useAsTitle: "sectionType"
// 	},
// 	fields: [
// 		{
// 			name: "sectionType",
// 			type: "select",
// 			required: true,
// 			unique: true,
// 			options: [
// 				{ label: "About Us", value: "about" },
// 				{ label: "Contact Departments", value: "contact" },
// 				{ label: "Social Links", value: "social" },
// 				{ label: "Business Partners", value: "partners" },
// 				{ label: "Business Locations", value: "locations" },
// 				{ label: "Image Gallery", value: "gallery" },
// 				{ label: "Business Services", value: "services" },
// 				{ label: "Download Apps", value: "apps" }
// 			]
// 		},
// 		{
// 			name: "title",
// 			type: "text",
// 			maxLength: 40,
// 			admin: {
// 				description: "Max 40 characters"
// 			},
// 			required: true,
// 			localized: true
// 		}
// 	]
// }
import { CollectionConfig } from "payload"
import { getUserTenantID } from "../utils"
import { TenantUser } from "../types"

export const SectionTitles: CollectionConfig = {
	slug: "section_titles",
	labels: {
		singular: "Section Title",
		plural: "Section Titles"
	},
	admin: {
		useAsTitle: "sectionType"
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

				if (operation === "create" || operation === "update") {
					const tenantId = data?.tenant || getUserTenantID(req.user as TenantUser)

					if (tenantId && data?.sectionType) {
						const query: any = {
							tenant: {
								equals: tenantId
							},
							sectionType: {
								equals: data.sectionType
							}
						}

						if (operation === "update" && data.id) {
							query.id = {
								not_equals: data.id
							}
						}

						const existing = await req.payload.find({
							collection: "section_titles",
							where: query,
							limit: 0,
							depth: 0
						})

						console.log(
							`Checking for existing section type ${data.sectionType} for tenant ${tenantId}:`,
							existing.totalDocs
						)

						if (existing.totalDocs > 0) {
							throw new Error(`Section type "${data.sectionType}" already exists for this tenant`)
						}
					}
				}

				return data
			}
		]
	},

	access: {
		create: ({ req }) => {
			return !!getUserTenantID(req.user as TenantUser)
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
			name: "sectionType",
			type: "select",
			required: true,
			options: [
				{ label: "About Us", value: "about" },
				{ label: "Contact Departments", value: "contact" },
				{ label: "Social Links", value: "social" },
				{ label: "Business Partners", value: "partners" },
				{ label: "Business Locations", value: "locations" },
				{ label: "Image Gallery", value: "gallery" },
				{ label: "Business Services", value: "services" },
				{ label: "Download Apps", value: "apps" }
			]
		},
		{
			name: "title",
			type: "text",
			maxLength: 40,
			admin: {
				description: "Max 40 characters"
			},
			required: true,
			localized: true
		}
	]
}
