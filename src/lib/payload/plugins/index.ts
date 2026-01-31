//#region Import
import type { Tenant } from "@payload-types"
import type { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types"
import type { Plugin } from "payload"

import { getServerSideURL } from "@/utils/getURL"
import { seoPlugin } from "@payloadcms/plugin-seo"
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
import { customTenantPlugin } from "./custom-tenant-plugin"

//#end region

const generateTitle: GenerateTitle<Tenant> = ({ doc }) => {
	return doc?.name ? `${doc.name} | business-profile` : "business-profile"
}

const generateURL: GenerateURL<Tenant> = ({ doc }) => {
	const url = getServerSideURL()

	return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
	seoPlugin({ generateTitle, generateURL }),
	customTenantPlugin([
		"media",
		"section_titles",
		"business_profile",
		"business_themes",
		"about_business",
		"image_galleries",
		"contact_departments",
		"social_links",
		"business_partners",
		"business_locations",
		"business_services"
	]),
	...(process.env.BLOB_READ_WRITE_TOKEN
		? [
				vercelBlobStorage({
					collections: {
						media: {
							disableLocalStorage: true,
							generateFileURL: ({ filename }) => {
								const generatedUrl = `${process.env.BLOB_URL}/${filename}`

								return generatedUrl
							}
						}
					},
					token: process.env.BLOB_READ_WRITE_TOKEN!
				})
			]
		: [])
]
