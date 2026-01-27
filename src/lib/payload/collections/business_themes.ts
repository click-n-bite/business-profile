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

export const BusinessThemes: CollectionConfig = {
	slug: "business_themes",
	admin: {
		useAsTitle: "name"
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: false
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
						condition: (_: any, siblingData: { type?: string }) => siblingData.type === "color"
					}
				},
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					admin: {
						condition: (_: any, siblingData: { type?: string }) => siblingData.type === "image"
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
						condition: (_: any, siblingData: { type?: string }) => siblingData?.type === "color"
					}
				},
				{
					name: "image",
					type: "upload",
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