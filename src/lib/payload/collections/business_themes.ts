/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionConfig } from "payload"

export const BusinessThemes: CollectionConfig = {
	slug: "business_themes",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "themeType", "primaryColor", "secondaryColor", "_status"]
		// hideAPIURL: true,
		// description: "Only one theme can exist at a time. Delete the existing theme to create a new one."
	},
	versions: {
		drafts: true,
		maxPerDoc: 10
	},
	access: {
		create: () => true,
		delete: () => true
	},
	// hooks: {
	// 	beforeValidate: [
	// 		async ({ data, operation, req }) => {
	// 			if (operation === "create") {
	// 				const count = await req.payload.count({
	// 					collection: "business_themes"
	// 				})

	// 				console.log("========== DEBUG ==========")
	// 				console.log("Operation:", operation)
	// 				console.log("Total docs:", count.totalDocs)
	// 				console.log("============================")

	// 				if (count.totalDocs >= 1) {
	// 					throw new Error(
	// 						`Only one theme can exist. Found ${count.totalDocs} theme(s). Please update the existing theme instead.`
	// 					)
	// 				}
	// 			}

	// 			return data
	// 		}
	// 	]
	// },
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
