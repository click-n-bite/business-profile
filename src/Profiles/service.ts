import { getServerLocale } from "@/lib/i18n/get-server-locale"
import { notFound } from "next/navigation"
import { getPayload } from "@/lib/payload/utils"
import { TenantsSelect } from "@payload-types"
import { ContactDepartment, FetchedTenantData, SocialLink } from "./types"

export const fetchTenantData = async (slug: string): Promise<FetchedTenantData> => {
	const locale = await getServerLocale()

	const payload = await getPayload()

	const tenantResult = await payload.find({
		collection: "tenants",
		where: {
			and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }]
		},
		select: {
			id: true,
			phone: true,
			enableDelivery: true,
			name: true,
			tva_percent: true
		} as unknown as TenantsSelect<true>,
		depth: 1,
		limit: 1,
		locale
	})

	if (!tenantResult || !tenantResult.docs.length) notFound()

	const tenant = tenantResult.docs[0]

	const tenantId = tenant.id

	const [
		businessProfile,
		businessThemes,
		aboutBusiness,
		imageGalleries,
		contactDepartments,
		socialLinks,
		businessPartners,
		businessService,
		businessLocations,
		sectionTitles,
		partnersCarouselSettings
	] = await Promise.all([
		payload.find({
			collection: "business_profile",
			where: { tenant: { equals: tenantId } },
			limit: 1,
			locale
		}),

		payload.find({
			collection: "business_themes",
			where: { tenant: { equals: tenantId } },
			locale
		}),

		payload.find({
			collection: "about_business",
			where: { tenant: { equals: tenantId } },
			limit: 1,
			locale
		}),

		payload.find({
			collection: "image_galleries",
			where: { tenant: { equals: tenantId } },
			locale
		}),

		payload.find({
			collection: "contact_departments",
			where: {
				and: [{ tenant: { equals: tenantId } }]
			},
			sort: "order",
			locale
		}),

		payload.find({
			collection: "social_links",
			where: { tenant: { equals: tenantId } },
			sort: "order",
			locale
		}),

		payload.find({
			collection: "business_partners",
			where: {
				and: [{ tenant: { equals: tenantId } }]
			},
			sort: "order",
			locale
		}),

		payload.find({
			collection: "business_services",
			where: { tenant: { equals: tenantId } },
			sort: "order",
			locale
		}),

		payload.find({
			collection: "business_locations",
			where: { tenant: { equals: tenantId } },
			sort: "order",
			locale
		}),
		payload.find({
			collection: "section_titles",
			where: { tenant: { equals: tenantId } },
			locale
		}),
		payload.find({
			collection: "partners_carousel_settings",
			where: { tenant: { equals: tenantId } },
			locale
		})
	])

	const sectionTitlesMap = sectionTitles.docs.reduce(
		(acc, title) => {
			acc[title.sectionType] = title.title

			return acc
		},
		{} as Record<string, string>
	)

	return {
		tenantId: tenantId.toString(),
		businessProfile: businessProfile.docs[0] || null,
		businessThemes: businessThemes.docs[0] || [],
		aboutBusiness: aboutBusiness.docs[0] || null,
		imageGalleries: imageGalleries.docs || [],
		contactDepartments: contactDepartments.docs as ContactDepartment[],
		socialLinks: socialLinks.docs as SocialLink[],
		businessPartners: businessPartners.docs || [],
		businessService: businessService.docs || [],
		businessLocations: businessLocations.docs || [],
		sectionTitles: sectionTitlesMap,
		partnersCarouselSettings: partnersCarouselSettings.docs[0] || null
	}
}
