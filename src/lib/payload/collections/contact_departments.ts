import { CollectionConfig } from "payload"

export const ContactDepartments: CollectionConfig = {
	slug: "contact_departments",

	fields: [
		{ name: "title", type: "text", required: true },
		{ name: "phone", type: "text", required: true },

		{
			name: "icon",
			type: "text",
			admin: {
				description: "Lucide icon name (phone, truck, building, headset, etc.)"
			}
		},

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
			name: "telephone",
			type: "checkbox",
			label: "Available by Telephone",
			defaultValue: false
		},

		{ name: "order", type: "number" }
	]
}
