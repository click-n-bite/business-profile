/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Hero } from "@/Profiles/business_profile/components/business_info"
import { About } from "@/Profiles/business_profile/components/about_business"
import { LocationCard } from "@/Profiles/business_profile/components/business_locations"
import { ContactDepartmentCard } from "@/Profiles/business_profile/components/contact_departments"
import { SocialLinksSection } from "@/Profiles/business_profile/components/social_links"
import { PartnersCarousel } from "@/Profiles/business_profile/components/partners-carousel"
import { Gallery } from "@/Profiles/business_profile/components/business_gallery"
import { SectionTitle } from "@/components/tenant/tenant-title"
import { SectionBubbles } from "@/components/common/bubble-design"
import BusinessServicesSection from "./components/business_services"
import { useSaveContact } from "@/hooks/use-save-contact"

interface BusinessLayoutProps {
	data: any
	theme: {
		primaryColor?: string
		secondaryColor?: string
		accentColor?: string
	}
}

export function BusinessLayout({ data, theme }: BusinessLayoutProps) {
	const { saveContact, ContactModal } = useSaveContact()

	return (
		<div className='flex justify-center md:px-6 md:py-10'>
			<SectionBubbles theme={theme} className='flex w-full max-w-3xl flex-col items-center gap-10 py-10'>
				{data.businessProfile && <Hero businessProfile={data.businessProfile} />}

				{data.aboutBusiness && (
					<div className='w-full max-w-xl'>
						<SectionTitle title={data.sectionTitles?.about || "About Us"} />
						<About aboutBusiness={data.aboutBusiness} theme={theme} />
					</div>
				)}

				{data.contactDepartments.length > 0 && (
					<div className='w-full md:max-w-xl'>
						<div className='flex flex-col'>
							<SectionTitle title={data.sectionTitles?.contact || "Contact Us"} />
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

				{data.imageGalleries?.[0]?.images && (
					<div className='w-full max-w-xl'>
						<SectionTitle title={data.sectionTitles?.gallery || "Gallery"} />
						<Gallery images={data.imageGalleries[0].images} />
					</div>
				)}

				{Array.isArray(data.businessService) && data.businessService.length > 0 && (
					<div className='w-full max-w-xl'>
						<SectionTitle title={data.sectionTitles?.services || "Services"} />
						<BusinessServicesSection services={data.businessService} theme={theme} />
					</div>
				)}

				{data.socialLinks?.length > 0 && (
					<div className='w-full max-w-xl'>
						<SectionTitle title={data.sectionTitles?.social || "Follow Us"} />
						<SocialLinksSection socialLinks={data.socialLinks} theme={theme} />
					</div>
				)}

				{data.businessPartners?.length > 0 && (
					<div className='w-full max-w-xl'>
						<SectionTitle title={data.sectionTitles?.partners || "Our Partners"} />
						<PartnersCarousel partners={data.businessPartners} />
					</div>
				)}

				{data.businessLocations.length > 0 && (
					<div className='w-full max-w-xl'>
						<section className='grid grid-cols-1 gap-2'>
							<SectionTitle title={data.sectionTitles?.locations || "Our Locations"} />
							{data.businessLocations.map((loc: any, idx: number) => (
								<LocationCard
									key={idx}
									title={loc.title}
									address={loc.description || ""}
									googleMapLink={loc.googleMapLink || ""}
									theme={theme}
								/>
							))}
						</section>
					</div>
				)}
			</SectionBubbles>
			<ContactModal />
		</div>
	)
}
