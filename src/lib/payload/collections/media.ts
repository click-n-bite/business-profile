import type { CollectionConfig } from "payload"

import path from "path"
import { fileURLToPath } from "url"

const filename = fileURLToPath(import.meta.url)

const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
	slug: "media",
	admin: {
		useAsTitle: "alt",
		defaultColumns: ["alt", "updatedAt"]
	},
	fields: [
		{
			name: "alt",
			required: true,
			type: "text"
		}
	],
	upload: {
		adminThumbnail: "thumbnail",
		imageSizes: [
			{ name: "thumbnail", width: 300 },
			{ height: 500, name: "square", width: 500 },
			{ name: "small", width: 600 },
			{ name: "medium", width: 900 },
			{ name: "large", width: 1400 },
			{ name: "xlarge", width: 1920 }
		],
		// Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
		staticDir: path.resolve(dirname, "../../../../public/media")
	}
}
