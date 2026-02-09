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
				description: "Max 160 characters",
				condition: (data) => !data?.isGlobalSettings
			}
		},
		{
			name: "logo",
			type: "upload",
			relationTo: "media",
			required: true,
			admin: {
				condition: (data) => !data?.isGlobalSettings
			}
		},
		{
			name: "website",
			type: "text",
			admin: {
				condition: (data) => !data?.isGlobalSettings
			}
		},
		{
			name: "order",
			type: "number",
			admin: {
				condition: (data) => !data?.isGlobalSettings
			}
		}
	]
}
