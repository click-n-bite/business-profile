import { CollectionConfig } from "payload"

export const BusinessPartners: CollectionConfig = {
	slug: "business_partners",

	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			localized: true,
			maxLength: 160,
			admin: {
				description: "Max 160 characters"
			}
		},
		{
			name: "logo",
			type: "upload",
			relationTo: "media",
			required: true
		},
		{ name: "website", type: "text" },
		{ name: "order", type: "number" }
	]
}
