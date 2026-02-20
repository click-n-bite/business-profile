/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionConfig } from "payload"

export const SectionTitles: CollectionConfig = {
	slug: "section_titles",
	labels: {
		singular: "Section Title",
		plural: "Section Titles"
	},
	admin: {
		useAsTitle: "sectionType"
	},
	fields: [
		{
			name: "sectionType",
			type: "select",
			required: true,
			// unique: true,
			options: [
				{ label: "About Us", value: "about" },
				{ label: "Contact Departments", value: "contact" },
				{ label: "Social Links", value: "social" },
				{ label: "Business Partners", value: "partners" },
				{ label: "Business Locations", value: "locations" },
				{ label: "Image Gallery", value: "gallery" },
				{ label: "Business Services", value: "services" },
				{ label: "Download Apps", value: "apps" },
				{ label: "Payment Section", value: "payment" }
			]
		},
		{
			name: "title",
			type: "text",
			maxLength: 40,
			admin: {
				description: "Max 40 characters"
			},
			required: true,
			localized: true
		}
	]
}
