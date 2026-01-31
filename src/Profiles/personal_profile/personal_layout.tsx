/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { PersonalAbout } from "./components/personal_about"
import { PersonalSocialLinks } from "./components/personal_social_links"
import { PersonalHero } from "./components/hero"
import { PersonalLocationCard } from "./components/personal_locations"
import { PartnersCarousel } from "../business_profile/components/partners-carousel"
import { Gallery } from "../business_profile/components/business_gallery"
import { ContactDepartmentCard } from "../business_profile/components/contact_departments"
import BusinessServicesSection from "../business_profile/components/business_services"
import { useSaveContact } from "@/hooks/use-save-contact"

interface PersonalPortfolioLayoutProps {
	data: any
	theme: {
		primaryColor?: string
		secondaryColor?: string
		accentColor?: string
	}
}

export function PersonalPortfolioLayout({ data, theme }: PersonalPortfolioLayoutProps) {
	const { saveContact, ContactModal } = useSaveContact()

	return (
		<div className='flex min-h-screen justify-center'>
			<div className='flex w-full max-w-4xl max-w-xl flex-col items-center'>
				{data.imageGalleries?.[0]?.images && (
					<div className='mb-6 w-full max-w-xl'>
						<Gallery images={data.imageGalleries[0].images} />
					</div>
				)}

				{data.businessProfile && <PersonalHero businessProfile={data.businessProfile} />}

				{data.aboutBusiness && (
					<div className='mb-6 flex w-full max-w-xl flex-col items-center'>
						<PersonalAbout aboutBusiness={data.aboutBusiness} />
					</div>
				)}

				{data.contactDepartments.length > 0 && (
					<div className='w-full md:max-w-xl'>
						<div className='flex flex-col'>
							{data.contactDepartments.map((dept: any) => (
								<ContactDepartmentCard
									id={dept.id}
									key={dept.id}
									title={dept.title}
									phone={dept.phone}
									whatsapp={!!dept.whatsapp}
									telegram={!!dept.telegram}
									telephone={!!dept.telephone}
									onSaveContact={saveContact}
								/>
							))}
						</div>
					</div>
				)}

				{data.socialLinks?.length > 0 && (
					<div className='mb-1 flex w-full max-w-xl flex-col items-center'>
						<PersonalSocialLinks socialLinks={data.socialLinks} theme={theme} />
					</div>
				)}

				{Array.isArray(data.businessService) && data.businessService.length > 0 && (
					<div className='w-full md:max-w-xl'>
						<BusinessServicesSection services={data.businessService} theme={theme} />
					</div>
				)}

				{data.businessLocations.length > 0 && (
					<div className='mb-6 flex w-full max-w-xl flex-col items-center'>
						{data.businessLocations.map((loc: any, idx: number) => (
							<PersonalLocationCard
								key={idx}
								title={loc.title}
								address={loc.description || ""}
								googleMapLink={loc.googleMapLink || ""}
							/>
						))}
					</div>
				)}

				{data.businessPartners?.length > 0 && (
					<div className='w-full max-w-xl pb-4'>
						<PartnersCarousel partners={data.businessPartners} />
					</div>
				)}
			</div>
			<ContactModal />
		</div>
	)
}
