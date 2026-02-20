import { CollectionConfig } from "payload"
import { getUserTenantID } from "../utils"
import { TenantUser } from "../types"

export const Settings: CollectionConfig = {
	slug: "settings",
	labels: {
		singular: "Setting",
		plural: "Settings"
	},
	admin: {
		useAsTitle: "title"
	},

	hooks: {
		beforeValidate: [
			async ({ data, req, operation }) => {
				if (req.user && !data?.tenant) {
					const tenantId = getUserTenantID(req.user as TenantUser)

					if (tenantId) {
						data = { ...data, tenant: tenantId }
					}
				}

				if (operation === "create") {
					const tenantId = data?.tenant || getUserTenantID(req.user as TenantUser)

					if (tenantId) {
						const existing = await req.payload.find({
							collection: "settings",
							where: {
								tenant: {
									equals: tenantId
								}
							},
							limit: 0
						})

						if (existing.totalDocs > 0) {
							throw new Error("This tenant already has settings configured")
						}
					}
				}

				return data
			}
		]
	},

	access: {
		create: ({ req }) => {
			if (!req.user) return false

			const tenantId = getUserTenantID(req.user as TenantUser)

			if (!tenantId) return false

			return (async () => {
				const existing = await req.payload.find({
					collection: "settings",
					where: {
						tenant: {
							equals: tenantId
						}
					},
					limit: 0
				})

				return existing.totalDocs === 0
			})()
		},
		read: ({ req }) => {
			if (!req.user) return false

			const tenantId = getUserTenantID(req.user as TenantUser)

			return {
				tenant: {
					equals: tenantId
				}
			}
		},
		update: ({ req }) => {
			if (!req.user) return false

			const tenantId = getUserTenantID(req.user as TenantUser)

			return {
				tenant: {
					equals: tenantId
				}
			}
		},
		delete: () => true
	},

	fields: [
		{
			name: "title",
			type: "text",
			required: true,
			defaultValue: "Site Settings",
			admin: {
				hidden: true
			}
		},

		// Language Settings
		{
			name: "defaultLanguage",
			type: "select",
			required: true,
			label: "Default Language",
			options: [
				{ label: "🇺🇸 English", value: "en" },
				{ label: "🇸🇦 العربية", value: "ar" }
			]
		},

		// Carousel Settings
		{
			name: "partnersCarousel",
			type: "group",
			label: "Partners Carousel Settings",
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
						condition: (data, siblingData) => siblingData?.autoplay === true
					}
				}
			]
		},

		// Enable/Disable Wishlist
		{
			name: "enableWhish",
			type: "checkbox",
			label: "Enable Whish Payment",
			defaultValue: true
		},

		// Enable/Disable Stripe
		{
			name: "enableStripe",
			type: "checkbox",
			label: "Enable Stripe Payment",
			defaultValue: false
		}
	]
}
