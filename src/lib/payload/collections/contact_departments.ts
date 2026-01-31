import { CollectionConfig } from "payload"

export const ContactDepartments: CollectionConfig = {
	slug: "contact_departments",

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
		{ name: "phone", type: "text", required: true, localized: true },
		{
			name: "whatsapp",
			type: "checkbox",
			label: "Available on WhatsApp",
			defaultValue: false
		},
		{
			name: "telegram",
			type: "checkbox",
			label: "Available on Telegram",
			defaultValue: false
		},
		{
			name: "sms",
			type: "checkbox",
			label: "Available SMS",
			defaultValue: false
		},
		{
			name: "telephone",
			type: "checkbox",
			label: "Available by Telephone",
			defaultValue: false
		},

		{ name: "order", type: "number" }
	]
}
