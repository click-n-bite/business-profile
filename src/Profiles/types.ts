import {
	AboutBusiness,
	BusinessLocation,
	BusinessPartner,
	BusinessProduct,
	BusinessProfile,
	BusinessService,
	BusinessTheme,
	DownloadLink,
	ImageGallery,
	Media,
	Setting
} from "@payload-types"

export type FetchedTenantData = {
	tenantId: string
	businessProfile: BusinessProfile
	businessThemes: BusinessTheme
	aboutBusiness: AboutBusiness
	imageGalleries: ImageGallery[]
	contactDepartments: ContactDepartment[]
	socialLinks: SocialLink[]
	Appdownload: DownloadLink[]
	businessPartners: BusinessPartner[]
	businessLocations: BusinessLocation[]
	businessService: BusinessService[]
	BusinessProduct: BusinessProduct[]
	settings: Setting[]
	sectionTitles: {
		about?: string
		contact?: string
		social?: string
		partners?: string
		locations?: string
		gallery?: string
		services?: string
	}
}

export interface SocialLink {
	id: string
	image: Media | string
	url: string
	label?: string
	order?: number
}

export interface ContactDepartment {
	id: string
	title: string
	phone: string
	whatsapp?: boolean
	telegram?: boolean
	telephone?: boolean
	sms?: boolean
	email?: string
}

export interface PersonalContactProps {
	contactDepartments: ContactDepartment[]
	theme?: {
		primaryColor?: string
	}
}

export interface SocialLinksProps {
	socialLinks: SocialLink[]
	theme?: {
		primaryColor?: string
	}
}

export interface AboutProps {
	aboutBusiness: {
		title?: string
		description?: string
	}
	theme?: {
		primaryColor?: string
	}
}
