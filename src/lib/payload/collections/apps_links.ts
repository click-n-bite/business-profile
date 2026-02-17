import { CollectionConfig } from "payload"

export const DownloadLinks: CollectionConfig = {
	slug: "download-links",

	fields: [
		{ name: "iosLink", type: "text", required: true },
		{ name: "androidLink", type: "text", required: true }
	]
}
