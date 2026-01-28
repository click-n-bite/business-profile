import {
	AboutBusiness,
	BusinessLocation,
	BusinessPartner,
	BusinessProfile,
	BusinessTheme,
	ImageGallery
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

export interface SocialLink {
	id: string
	platform: string
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
	email?: string
	theme?: {
		primaryColor?: string
		secondaryColor?: string
		accentColor?: string
	}
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
