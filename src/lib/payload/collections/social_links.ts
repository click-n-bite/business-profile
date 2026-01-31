// import { CollectionConfig } from "payload"

// export const SocialLinks: CollectionConfig = {
// 	slug: "social_links",

// 	fields: [
// 		{
// 			name: "platform",
// 			type: "select",
// 			required: true,
// 			options: [
// 				"website",
// 				"instagram",
// 				"tiktok",
// 				"telegram",
// 				"facebook",
// 				"linkedin",
// 				"youtube",
// 				"twitter",
// 				"protofolio",
// 				"pinterest",
// 				"github"
// 			],
// 			defaultValue: "website"
// 		},

// 		{ name: "label", type: "text" },
// 		{ name: "url", type: "text", required: true },
// 		{ name: "order", type: "number" }
// 	]
// }

import { CollectionConfig } from "payload"

export const SocialLinks: CollectionConfig = {
	slug: "social_links",
	fields: [
		{
			name: "platform",
			type: "select",
			required: true,
			options: [
				{ label: "Website", value: "website" },
				{ label: "Google Reviews", value: "google" },
				{ label: "Instagram", value: "instagram" },
				{ label: "TikTok", value: "tiktok" },
				{ label: "Telegram", value: "telegram" },
				{ label: "Facebook", value: "facebook" },
				{ label: "LinkedIn", value: "linkedin" },
				{ label: "YouTube", value: "youtube" },
				{ label: "Twitter/X", value: "twitter" },
				{ label: "Portfolio", value: "portfolio" },
				{ label: "Pinterest", value: "pinterest" },
				{ label: "GitHub", value: "github" },
				{ label: "WhatsApp", value: "whatsapp" },
				{ label: "Threads", value: "threads" },
				{ label: "Snapchat", value: "snapchat" },
				{ label: "Discord", value: "discord" },
				{ label: "Reddit", value: "reddit" },
				{ label: "Twitch", value: "twitch" },
				{ label: "Spotify", value: "spotify" },
				{ label: "Behance", value: "behance" },
				{ label: "Dribbble", value: "dribbble" },
				{ label: "Figma", value: "figma" },
				{ label: "Newsletter", value: "newsletter" },
				{ label: "Email", value: "email" },
				{ label: "Phone", value: "phone" },
				{ label: "Linktree", value: "linktree" },
				{ label: "Calendly", value: "calendly" }
			],
			defaultValue: "website"
		},
		{
			name: "label",
			type: "text",
			required: true,
			localized: true,
			maxLength: 60,
			admin: {
				description: "Max 60 characters"
			}
		},
		{
			name: "url",
			type: "text",
			required: true
		},
		{
			name: "order",
			type: "number",
			defaultValue: 0
		}
	]
}
