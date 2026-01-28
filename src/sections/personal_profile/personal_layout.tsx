/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { PersonalAbout } from "./components/personal_about"
import { PersonalSocialLinks } from "./components/personal_social_links"
import { PersonalContact } from "./components/personal_contact"
import { PersonalHero } from "./components/hero"
import { PersonalLocationCard } from "./components/personal_locations"
import { PartnersCarousel } from "../business_profile/components/partners-carousel"
import { Gallery } from "../business_profile/components/business_gallery"

interface PersonalPortfolioLayoutProps {
	data: any
	theme: {
		primaryColor?: string
		secondaryColor?: string
		accentColor?: string
	}
}

export function PersonalPortfolioLayout({ data, theme }: PersonalPortfolioLayoutProps) {
	return (
		<div className='flex min-h-screen justify-center'>
			<div className='flex w-full max-w-4xl max-w-xl flex-col items-center'>
				{data.imageGalleries?.[0]?.images && (
					<div className='mb-6 w-full max-w-xl px-2'>
						<Gallery images={data.imageGalleries[0].images} />
					</div>
				)}

				{data.businessProfile && <PersonalHero businessProfile={data.businessProfile} />}

				{data.aboutBusiness && (
					<div className='mb-6 flex w-full max-w-xl flex-col items-center px-4'>
						<PersonalAbout aboutBusiness={data.aboutBusiness} theme={theme} />
					</div>
				)}

				{data.contactDepartments.length > 0 && (
					<div className='mb-6 flex w-full max-w-xl flex-col items-center px-4'>
						<PersonalContact contactDepartments={data.contactDepartments} theme={theme} />
					</div>
				)}

				{data.socialLinks?.length > 0 && (
					<div className='mb-6 flex w-full max-w-xl flex-col items-center px-4'>
						<PersonalSocialLinks socialLinks={data.socialLinks} theme={theme} />
					</div>
				)}

				{data.businessLocations.length > 0 && (
					<div className='mb-6 flex w-full max-w-xl flex-col items-center px-4'>
						{data.businessLocations.map((loc: any, idx: number) => (
							<PersonalLocationCard
								key={idx}
								title={loc.title}
								address={loc.description || ""}
								googleMapLink={loc.googleMapLink || ""}
								theme={theme}
							/>
						))}
					</div>
				)}

				{data.businessPartners?.length > 0 && (
					<div className='w-full max-w-xl px-4 pb-4'>
						<PartnersCarousel partners={data.businessPartners} />
					</div>
				)}
			</div>
		</div>
	)
}
