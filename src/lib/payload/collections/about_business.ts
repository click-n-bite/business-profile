import { CollectionConfig } from "payload"

export const AboutSections: CollectionConfig = {
	slug: "about_business",

	// hooks: {
	// 	beforeValidate: [
	// 		async ({ data, req, operation }) => {
	// 			if (operation === "create") {
	// 				const existing = await req.payload.find({
	// 					collection: "about_business",
	// 					limit: 0
	// 				})

	// 				if (existing.totalDocs > 0) {
	// 					throw new Error("Only one About Section can exist")
	// 				}
	// 			}

	// 			return data
	// 		}
	// 	]
	// },

	access: {
		create: () => true,
		delete: () => true
	},

	fields: [
		{
			name: "description",
			type: "textarea",
			required: true,
			maxLength: 160,
			admin: {
				description: "Max 160 characters"
			},
			localized: true
		}
	]
}
