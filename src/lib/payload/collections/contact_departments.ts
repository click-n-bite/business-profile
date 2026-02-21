import { CollectionConfig } from "payload"

export const ContactDepartments: CollectionConfig = {
	slug: "contact_departments",
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
			name: "phone",
			type: "text",
			required: true,
			localized: false,
			admin: {
				description: "International format will be saved automatically",
				components: {
					Field: "@/components/payload/PhoneField"
				}
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
