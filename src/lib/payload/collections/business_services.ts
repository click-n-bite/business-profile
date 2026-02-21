import { CollectionConfig } from "payload"

export const BusinessServices: CollectionConfig = {
	slug: "business_services",
	admin: {
		useAsTitle: "title",
		components: {
			afterList: ["@/components/payload/SimpleSortableBottom"]
		}
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
			name: "serviceImage",
			label: "Service Image",
			type: "upload",
			relationTo: "media",
			required: false,
			admin: {
				description: ""
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
			index: true,
			defaultValue: 0,
			admin: {
				hidden: true
			}
		}
	]
}
