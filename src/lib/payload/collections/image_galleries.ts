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
		}
	]
}
