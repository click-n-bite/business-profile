import { CollectionConfig } from "payload"

export const BusinessPartners: CollectionConfig = {
	slug: "business_partners",

	fields: [
		{ name: "name", type: "text", required: true, localized: true },
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
