import { CollectionConfig } from "payload"

const BRAND_COLORS = [
	{ label: "Blue", value: "#3B82F6" },
	{ label: "Green", value: "#136c36" },
	{ label: "Red", value: "#c30811" },
	{ label: "Yellow", value: "#FACC15" },
	{ label: "Purple", value: "#8B5CF6" },
	{ label: "Pink", value: "#EC4899" },
	{ label: "Gray", value: "#6B7280" }
]

export const BusinessThemes: CollectionConfig = {
	slug: "business_themes",
	admin: {
		useAsTitle: "name"
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true
		},
		{
			name: "lightBackground",
			type: "group",
			fields: [
				{
					name: "type",
					type: "select",
					options: [
						{ label: "Color", value: "color" },
						{ label: "Image", value: "image" }
					],
					defaultValue: "color"
				},
				{
					name: "color",
					type: "select",
					options: [
						{ label: "White", value: "#FFFFFF" },
						{ label: "Gray 50", value: "#F9FAFB" },
						{ label: "Gray 100", value: "#F3F4F6" }
					],
					admin: {
						condition: (_, siblingData) => siblingData.type === "color"
					}
				},
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					admin: {
						condition: (_, siblingData) => siblingData.type === "image"
					}
				}
			]
		},

		{
			name: "darkBackground",
			type: "group",
			fields: [
				{
					name: "type",
					type: "select",
					options: [
						{ label: "Color", value: "color" },
						{ label: "Image", value: "image" }
					],
					defaultValue: "color",
					required: true
				},
				{
					name: "color",
					type: "select",
					options: [
						{ label: "Black", value: "#000000" },
						{ label: "Gray 900", value: "#111827" }
					],
					admin: {
						condition: (_, siblingData) => siblingData?.type === "color"
					}
				},
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					admin: {
						condition: (_, siblingData) => siblingData?.type === "image"
					}
				}
			]
		},
		{
			name: "primaryColor",
			type: "select",
			required: true,
			options: BRAND_COLORS
		},
		{
			name: "secondaryColor",
			type: "select",
			options: BRAND_COLORS
		},
		{
			name: "accentColor",
			type: "select",
			options: BRAND_COLORS
		}
	]
}
