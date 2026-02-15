import { CollectionConfig } from "payload"

export const DownloadLinks: CollectionConfig = {
	slug: "download-links",

	fields: [
		{ name: "iosLink", type: "text" },
		{ name: "androidLink", type: "text" }
	]
}
