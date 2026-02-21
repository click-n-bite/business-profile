import { CollectionConfig } from "payload"

export const BusinessLocations: CollectionConfig = {
	slug: "business_locations",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "googleMapLink", "updatedAt"],
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
				description: "Location name/title (max 60 characters)"
			}
		},
		{
			name: "description",
			type: "textarea",
			localized: true,
			maxLength: 160,
			admin: {
				description: "Location description (max 160 characters)"
			}
		},
		{
			name: "googleMapLink",
			type: "text",
			admin: {
				description: "Google Maps embed link or URL"
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
