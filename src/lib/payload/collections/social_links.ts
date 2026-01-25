import { CollectionConfig } from "payload"

export const SocialLinks: CollectionConfig = {
	slug: "social_links",

	fields: [
		{
			name: "platform",
			type: "select",
			required: true,
			options: ["website", "instagram", "tiktok", "telegram", "facebook", "linkedin", "youtube", "twitter"]
		},

		{ name: "label", type: "text" },
		{ name: "url", type: "text", required: true },
		{ name: "order", type: "number" }
	]
}
