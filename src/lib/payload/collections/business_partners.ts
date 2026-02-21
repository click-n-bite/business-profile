import { CollectionConfig } from "payload"

export const BusinessPartners: CollectionConfig = {
	slug: "business_partners",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "website", "updatedAt"],
		components: {
			afterList: ["@/components/payload/SimpleSortableBottom"]
		}
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			localized: true,
			maxLength: 160,
			admin: {
				description: "Partner/Company name (max 160 characters)"
			}
		},
		{
			name: "logo",
			type: "upload",
			relationTo: "media",
			required: true,
			admin: {
				description: "Company logo or partner image"
			}
		},
		{
			name: "website",
			type: "text",
			admin: {
				description: "Partner's website URL (optional)"
			}
		},
		{
			name: "order",
			type: "number",
			index: true,
			defaultValue: 0,
			admin: {
				hidden: true
			}
		}
	]
}
