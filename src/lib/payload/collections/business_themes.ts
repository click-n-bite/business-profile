/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionConfig } from "payload"

const BRAND_COLORS = [
	{ label: "Blue", value: "#3B82F6" },
	{ label: "Green", value: "#136c36" },
	{ label: "Red", value: "#c30811" },
	{ label: "Yellow", value: "#FACC15" },
	{ label: "Purple", value: "#8B5CF6" },
	{ label: "Pink", value: "#EC4899" },
	{ label: "Gray", value: "#6B7280" },
	{ label: "Soft Pink", value: "#FCE7F3" },
	{ label: "Light Blue", value: "#DBEAFE" },
	{ label: "Mint Green", value: "#D1FAE5" },
	{ label: "Lavender", value: "#E9D5FF" },
	{ label: "Peach", value: "#FFEDD5" },
	{ label: "Sky Blue", value: "#E0F2FE" },
	{ label: "Light Gray", value: "#F3F4F6" },
	{ label: "Beige", value: "#FEF3C7" },
	{ label: "Rose Quartz", value: "#FECDD3" },
	{ label: "Sea Foam", value: "#CCFBF1" },
	{ label: "Corporate Blue", value: "#1E40AF" },
	{ label: "Professional Gray", value: "#4B5563" },
	{ label: "Trust Green", value: "#065F46" },
	{ label: "Energy Orange", value: "#EA580C" },
	{ label: "Creative Purple", value: "#7C3AED" },
	{ label: "Innovation Teal", value: "#0D9488" },
	{ label: "Luxury Gold", value: "#B45309" },
	{ label: "Modern Black", value: "#1F2937" },
	{ label: "Tech Blue", value: "#2563EB" },
	{ label: "Eco Green", value: "#15803D" }
]

const createColorOptions = () => {
	return BRAND_COLORS.map((color) => ({
		label: `${color.label} (${color.value})`,
		value: color.value
	}))
}

export const BusinessThemes: CollectionConfig = {
	slug: "business_themes",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "themeType", "primaryColor", "secondaryColor"],
		hideAPIURL: true
	},
	access: {
		create: async ({ req }) => {
			const count = await req.payload.count({
				collection: "business_themes"
			})

			return count.totalDocs === 0
		},
		delete: () => false
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
					type: "select",
					label: "Background Color",
					options: createColorOptions(),
					admin: {
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
					type: "select",
					label: "Background Color",
					options: createColorOptions(),
					admin: {
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
			name: "primaryColor",
			type: "select",
			label: "Primary Color",
			required: true,
			admin: {
				description: "Main brand color for buttons, links, and important elements"
			},
			options: createColorOptions()
		},
		{
			name: "secondaryColor",
			type: "select",
			label: "Secondary Color",
			admin: {
				description: "Supporting color for backgrounds, borders, and secondary elements"
			},
			options: createColorOptions()
		}
	]
}
