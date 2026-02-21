/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionConfig } from "payload"
import { getUserTenantID } from "../utils"
import { TenantUser } from "../types"

export const BusinessThemes: CollectionConfig = {
	slug: "business_themes",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "themeType", "primaryColor", "secondaryColor", "_status"],
		hideAPIURL: true,
		description: "Only one theme can exist at a time. Delete the existing theme to create a new one."
	},
	hooks: {
		beforeValidate: [
			async ({ data, operation, req }) => {
				if (operation === "create") {
					let tenantId = data?.tenant

					if (!tenantId && req.user) {
						tenantId = getUserTenantID(req.user as TenantUser)
					}

					if (tenantId) {
						const existing = await req.payload.find({
							collection: "business_themes",
							where: {
								tenant: {
									equals: tenantId
								}
							},
							limit: 0,
							depth: 0
						})

						console.log(`Checking for existing theme for tenant ${tenantId}:`, existing.totalDocs)

						if (existing.totalDocs > 0) {
							throw new Error(
								`This tenant already has a theme. Found ${existing.totalDocs} theme(s). Please update the existing theme instead.`
							)
						}

						data = { ...data, tenant: tenantId }
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
				try {
					const existing = await req.payload.find({
						collection: "business_themes",
						where: {
							tenant: {
								equals: tenantId
							}
						},
						limit: 0,
						depth: 0
					})

					return existing.totalDocs === 0
				} catch (error) {
					console.error("Error checking existing theme:", error)

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
			name: "name",
			type: "text",
			required: true,
			label: "Theme Name",
			admin: {
				description: "Give your theme a descriptive name"
			}
		},

		{
			name: "primaryColor",
			type: "text",
			label: "Primary Color",
			defaultValue: "#3B82F6",
			admin: {
				components: {
					Field: "@/components/payload/ColorPickerField"
				},
				description: "Main brand color"
			}
		},
		{
			name: "secondaryColor",
			type: "text",
			label: "Secondary Color",
			defaultValue: "#6B7280",
			admin: {
				components: {
					Field: "@/components/payload/ColorPickerField"
				},
				description: "Supporting brand color"
			}
		},
		{
			name: "lightTitleColor",
			type: "text",
			label: "Business Name Light Theme",
			defaultValue: "#000",
			admin: {
				components: {
					Field: "@/components/payload/ColorPickerField"
				},
				description: "Supporting brand color"
			}
		},
		{
			name: "darkTitleColor",
			type: "text",
			label: "Business Name Dark Theme",
			defaultValue: "#fff",
			admin: {
				components: {
					Field: "@/components/payload/ColorPickerField"
				},
				description: "Supporting brand color"
			}
		},
		{
			name: "lightBackground",
			type: "group",
			label: "Light Mode Background",
			fields: [
				{
					name: "type",
					type: "select",
					label: "Background Type",
					options: [
						{ label: "Solid Color", value: "color" },
						{ label: "Image", value: "image" }
					],
					defaultValue: "color",
					required: true
				},
				{
					name: "color",
					type: "text",
					label: "Background Color",
					defaultValue: "#FFFFFF",
					admin: {
						components: {
							Field: "@/components/payload/ColorPickerField"
						},
						condition: (_: any, siblingData: { type?: string }) => siblingData?.type === "color"
					}
				},
				{
					name: "image",
					type: "upload",
					label: "Background Image",
					relationTo: "media",
					admin: {
						condition: (_: any, siblingData: { type?: string }) => siblingData?.type === "image"
					}
				}
			]
		},
		{
			name: "darkBackground",
			type: "group",
			label: "Dark Mode Background",
			fields: [
				{
					name: "type",
					type: "select",
					label: "Background Type",
					options: [
						{ label: "Solid Color", value: "color" },
						{ label: "Image", value: "image" }
					],
					defaultValue: "color",
					required: true
				},
				{
					name: "color",
					type: "text",
					label: "Background Color",
					defaultValue: "#000000",
					admin: {
						components: {
							Field: "@/components/payload/ColorPickerField"
						},
						condition: (_: any, siblingData: { type?: string }) => siblingData?.type === "color"
					}
				},
				{
					name: "image",
					type: "upload",
					label: "Background Image",
					relationTo: "media",
					admin: {
						condition: (_: any, siblingData: { type?: string }) => siblingData?.type === "image"
					}
				}
			]
		},
		{
			name: "themeType",
			type: "select",
			label: "Theme Type",
			required: true,
			defaultValue: "business",
			admin: {
				description: "Choose the purpose of this theme"
			},
			options: [
				{
					label: "👔 Business / Professional",
					value: "business"
				},
				{
					label: "👤 Personal / Individual",
					value: "personal"
				}
			]
		}
	]
}
