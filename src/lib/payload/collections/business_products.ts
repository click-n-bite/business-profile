import { CollectionConfig } from "payload"

export const BusinessProducts: CollectionConfig = {
	slug: "business_products",
	admin: {
		useAsTitle: "title"
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
			localized: true,
			maxLength: 60,
			admin: {
				description: "Max 60 characters"
			}
		},
		{
			name: "description",
			type: "textarea",
			localized: true,
			maxLength: 160,
			admin: {
				description: "Max 160 characters"
			}
		},
		{
			name: "url_name",
			type: "text",
			required: false,
			localized: true
		},
		{
			name: "url",
			type: "text",
			required: false
		},
		{
			name: "order",
			type: "number",
			admin: {
				description: "Display order"
			}
		}
	]
}
