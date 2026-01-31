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
			required: true,
			localized: true,
			maxLength: 60,
			admin: {
				description: "Max 60 characters"
			}
		},
		{
			name: "slogan",
			type: "text",
			localized: true,
			maxLength: 100,
			admin: {
				description: "Max 100 characters"
			}
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
