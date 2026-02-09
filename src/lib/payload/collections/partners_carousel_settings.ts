import { CollectionConfig } from "payload"

export const PartnersCarouselSettings: CollectionConfig = {
	slug: "partners_carousel_settings",
	access: {
		read: () => true,
		update: () => true
	},
	fields: [
		{
			name: "autoplay",
			type: "checkbox",
			label: "Enable Autoplay",
			defaultValue: true
		},
		{
			name: "autoplaySpeed",
			type: "number",
			label: "Autoplay Speed (milliseconds)",
			defaultValue: 5000,
			min: 1000,
			max: 10000,
			admin: {
				condition: (data) => data?.autoplay === true
			}
		}
	]
}
