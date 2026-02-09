import { CollectionConfig } from "payload"

export const ImageGalleries: CollectionConfig = {
	slug: "image_galleries",

	fields: [
		{
			name: "images",
			type: "array",
			fields: [
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					required: true
				}
			]
		},
		{
			name: "autoplay",
			type: "checkbox",
			label: "Enable Autoplay",
			defaultValue: true
		},
		{
			name: "autoplayDelay",
			type: "number",
			label: "Autoplay Delay (milliseconds)",
			defaultValue: 5000,
			min: 1000,
			max: 10000,
			admin: {
				condition: (data) => data?.autoplay === true
			}
		}
	]
}
