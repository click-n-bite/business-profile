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
import BusinessProductsSection from "../business_profile/components/business_products"
import { PaymentMethods } from "../business_profile/components/business_payment"
import { useRouter } from "next/navigation"

interface PersonalPortfolioLayoutProps {
	data: any
	theme: {
		primaryColor?: string
		secondaryColor?: string
		lightTitleColor?: string
		darkTitleColor?: string
	}
}

export function PersonalPortfolioLayout({ data, theme }: PersonalPortfolioLayoutProps) {
	const { saveContact, ContactModal } = useSaveContact()

	const router = useRouter()

	const selectMethod = (method: "whish" | "stripe") => {
		if (method === "whish") {
			router.push("/whish-payment")
		} else if (method === "stripe") {
			router.push("/stripe-payment")
		}
	}

	let hasRenderedSection = false

	const Divider = () => <hr className='my-8 w-full max-w-xl border-t border-gray-200 dark:border-gray-800' />

	return (
		<div className='flex min-h-screen justify-center'>
			<div className='flex w-full max-w-4xl max-w-xl flex-col items-center'>
				{data.imageGalleries?.[0]?.images && (
					<div className='w-full max-w-xl'>
						<Gallery images={data.imageGalleries[0].images} />
					</div>
				)}

				{data.businessProfile && (
					<div className='w-full max-w-xl'>
						<PersonalHero businessProfile={data.businessProfile} theme={theme} />
					</div>
				)}

				{data.aboutBusiness && (
					<>
						{hasRenderedSection && <Divider />}
						<div className='w-full max-w-xl'>
							<PersonalAbout aboutBusiness={data.aboutBusiness} />
						</div>
						{(hasRenderedSection = true)}
					</>
				)}

				{data.contactDepartments.length > 0 && (
					<>
						{hasRenderedSection && <Divider />}
						<div className='w-full md:max-w-xl'>
							<div className='flex flex-col gap-3'>
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
						{(hasRenderedSection = true)}
					</>
				)}

				{data.socialLinks?.length > 0 && (
					<>
						{hasRenderedSection && <Divider />}
						<div className='w-full max-w-xl'>
							<PersonalSocialLinks socialLinks={data.socialLinks} theme={theme} />
						</div>
						{(hasRenderedSection = true)}
					</>
				)}

				{data.settings?.length > 0 && (
					<>
						{hasRenderedSection && <Divider />}
						<div className='w-full max-w-xl'>
							<PaymentMethods settings={data.settings[0]} onSelectMethod={selectMethod} theme={theme} />
						</div>
						{(hasRenderedSection = true)}
					</>
				)}

				{data.businessLocations.length > 0 && (
					<>
						{hasRenderedSection && <Divider />}
						<div className='w-full max-w-xl'>
							<div className='flex flex-col gap-3'>
								{data.businessLocations.map((loc: any, idx: number) => (
									<PersonalLocationCard
										key={idx}
										title={loc.title}
										address={loc.description || ""}
										googleMapLink={loc.googleMapLink || ""}
									/>
								))}
							</div>
						</div>
						{(hasRenderedSection = true)}
					</>
				)}

				{Array.isArray(data.businessService) && data.businessService.length > 0 && (
					<>
						{hasRenderedSection && <Divider />}
						<div className='w-full md:max-w-xl'>
							<BusinessServicesSection services={data.businessService} theme={theme} />
						</div>
						{(hasRenderedSection = true)}
					</>
				)}

				{Array.isArray(data.BusinessProduct) && data.BusinessProduct.length > 0 && (
					<>
						{hasRenderedSection && <Divider />}
						<div className='w-full md:max-w-xl'>
							<BusinessProductsSection products={data.BusinessProduct} theme={theme} />
						</div>
						{(hasRenderedSection = true)}
					</>
				)}

				{data.businessPartners?.length > 0 && (
					<>
						{hasRenderedSection && <Divider />}
						<div className='mb-4 w-full max-w-xl'>
							<PartnersCarousel
								partners={data.businessPartners}
								autoplay={data.Settings?.[0]?.partnersCarousel?.autoplay ?? true}
								autoplaySpeed={data.Settings?.[0]?.partnersCarousel?.autoplaySpeed ?? 5000}
							/>
						</div>
						{(hasRenderedSection = true)}
					</>
				)}
			</div>
			<ContactModal />
		</div>
	)
}
