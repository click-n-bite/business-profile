import { CollectionConfig } from "payload"

export const BusinessLocations: CollectionConfig = {
	slug: "business_locations",

	fields: [
		{ name: "title", type: "text", required: true, localized: true },
		{ name: "description", type: "textarea", localized: true },
		{ name: "googleMapLink", type: "text" },
		{ name: "order", type: "number" }
	]
}
