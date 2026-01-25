import {
	AboutBusiness,
	BusinessLocation,
	BusinessPartner,
	BusinessProfile,
	BusinessTheme,
	ContactDepartment,
	ImageGallery,
	SocialLink
} from "@payload-types"

export type FetchedTenantData = {
	tenantId: string
	businessProfile: BusinessProfile
	businessThemes: BusinessTheme
	aboutBusiness: AboutBusiness
	imageGalleries: ImageGallery[]
	contactDepartments: ContactDepartment[]
	socialLinks: SocialLink[]
	businessPartners: BusinessPartner[]
	businessLocations: BusinessLocation[]
	sectionTitles: {
		about?: string
		contact?: string
		social?: string
		partners?: string
		locations?: string
		gallery?: string
	}
}
