import { CollectionConfig } from "payload"

export const SocialLinks: CollectionConfig = {
	slug: "social_links",
	fields: [
		{
			name: "label",
			type: "text",
			required: true,
			localized: true,
			maxLength: 60,
			admin: {
				description: "Display name for the social link (max 60 characters)"
			}
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media",
			required: true,
			admin: {
				description: "Custom icon/image for this social link"
			}
		},
		{
			name: "url",
			type: "text",
			required: true,
			admin: {
				description: "Full URL to the social profile/page"
			}
		},
		{
			name: "order",
			type: "number",
			defaultValue: 0,
			admin: {
				description: "Order in which links appear (lower numbers first)"
			}
		}
	]
}
