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
import { Download } from "./components/android_ios"
import BusinessProductsSection from "./components/business_products"
import { PaymentMethods } from "./components/business_payment"
import { useRouter } from "next/navigation"

interface BusinessLayoutProps {
	data: any
	theme: {
		primaryColor?: string
		secondaryColor?: string
		lightTitleColor?: string
		darkTitleColor?: string
	}
}

export function BusinessLayout({ data, theme }: BusinessLayoutProps) {
	const { saveContact, ContactModal } = useSaveContact()

	const router = useRouter()

	const selectMethod = (method: "whish" | "stripe") => {
		if (method === "whish") {
			router.push("/whish-payment")
		} else if (method === "stripe") {
			router.push("/stripe-payment")
		}
	}

	return (
		<div className='flex justify-center md:px-6 md:py-10'>
			<SectionBubbles className='flex w-full max-w-3xl flex-col items-center py-10'>
				{data.businessProfile && <Hero businessProfile={data.businessProfile} theme={theme} />}

				{data.aboutBusiness && (
					<div className='mt-10 w-full max-w-xl'>
						<SectionTitle title={data.sectionTitles?.about || "About Us"} />
						<About aboutBusiness={data.aboutBusiness} />
					</div>
				)}

				{data.contactDepartments.length > 0 && (
					<div className='mt-10 w-full max-w-xl'>
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
					<div className='mt-10 w-full max-w-xl'>
						<SectionTitle title={data.sectionTitles?.gallery || "Gallery"} />
						<Gallery images={data.imageGalleries[0].images} />
					</div>
				)}

				{data.socialLinks?.length > 0 && (
					<div className='mt-10 w-full max-w-xl'>
						<SectionTitle title={data.sectionTitles?.social || "Follow Us"} />
						<SocialLinksSection socialLinks={data.socialLinks} theme={theme} />
					</div>
				)}

				{data.settings.length > 0 && (
					<div className='mt-10 w-full max-w-xl'>
						<SectionTitle title={data.sectionTitles?.payment || "Pay Online"} />
						<PaymentMethods settings={data.settings[0]} onSelectMethod={selectMethod} theme={theme} />
					</div>
				)}

				{data.businessLocations.length > 0 && (
					<div className='mt-10 w-full max-w-xl'>
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
				{Array.isArray(data.businessService) && data.businessService.length > 0 && (
					<div className='mt-10 w-full max-w-xl'>
						<SectionTitle title={data.sectionTitles?.services || "Our Services"} />
						<BusinessServicesSection services={data.businessService} theme={theme} />
					</div>
				)}
				{Array.isArray(data.BusinessProduct) && data.BusinessProduct.length > 0 && (
					<div className='mt-10 w-full max-w-xl'>
						<SectionTitle title={data.sectionTitles?.products || "Our Products"} />
						<BusinessProductsSection products={data.BusinessProduct} theme={theme} />
					</div>
				)}

				{data.businessPartners?.length > 0 && (
					<div className='mt-10 w-full max-w-xl'>
						<SectionTitle title={data.sectionTitles?.partners || "Our Partners"} />
						<PartnersCarousel
							partners={data.businessPartners}
							autoplay={data.Settings?.[0]?.partnersCarousel?.autoplay ?? true}
							autoplaySpeed={data.Settings?.[0]?.partnersCarousel?.autoplaySpeed ?? 5000}
						/>
					</div>
				)}

				{data.Appdownload.length > 0 && (
					<div className='mt-10 w-full max-w-xl'>
						<SectionTitle title={data.sectionTitles?.apps} />
						<Download appLinks={data.Appdownload} />
					</div>
				)}
			</SectionBubbles>
			<ContactModal />
		</div>
	)
}
