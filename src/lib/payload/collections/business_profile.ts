import { CollectionConfig } from "payload"

export const BusinessProfiles: CollectionConfig = {
	slug: "business_profile",

	admin: {
		useAsTitle: "businessName"
	},

	fields: [
		{
			name: "businessName",
			type: "text",
			required: true
		},
		{
			name: "slogan",
			type: "text"
		},
		{
			name: "logoLight",
			label: "Logo (Light Mode)",
			type: "upload",
			relationTo: "media",
			required: false,
			admin: {
				description: ""
			}
		},
		{
			name: "logoDark",
			label: "Logo (Dark Mode)",
			type: "upload",
			relationTo: "media",
			required: false,
			admin: {
				description: ""
			}
		}
	]
}
