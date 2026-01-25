import { Hero } from "@/sections/business_profile/components/business_info"
import { About } from "@/sections/business_profile/components/about_business"
import { LocationCard } from "@/sections/business_profile/components/business_locations"
import { ContactDepartmentCard } from "@/sections/business_profile/components/contact_departments"
import { SocialLinksSection } from "@/sections/business_profile/components/social_links"
import { PartnersCarousel } from "@/sections/business_profile/components/partners-carousel"
import { BusinessGallery } from "@/sections/business_profile/components/business_gallery"
import { SectionTitle } from "@/components/tenant/tenant-title"
import { SectionBubbles } from "@/components/common/bubble-design"
import { fetchTenantData } from "@/sections/business_profile/service"

interface PageProps {
	params: { slug: string }
}

export default async function TenantPage({ params }: PageProps) {
	const { slug } = params

	const data = await fetchTenantData(slug)

	const theme = {
		primaryColor: data.businessThemes?.primaryColor || "",
		secondaryColor: data.businessThemes?.secondaryColor || "",
		accentColor: data.businessThemes?.accentColor || ""
	}

	return (
		<div className='flex justify-center md:px-6 md:py-10'>
			<SectionBubbles theme={theme} className='flex w-full max-w-3xl flex-col items-center gap-10 py-10'>
				{data.businessProfile && <Hero businessProfile={data.businessProfile} theme={theme} />}

				{data.aboutBusiness && (
					<div className='w-full max-w-xl'>
						<SectionTitle title={data.sectionTitles?.about || "About Us"} />
						<About aboutBusiness={data.aboutBusiness} theme={theme} />
					</div>
				)}

				{data.imageGalleries?.[0]?.images && (
					<div className='w-full max-w-xl'>
						<SectionTitle title={data.sectionTitles?.gallery || "Gallery"} />
						<BusinessGallery images={data.imageGalleries[0].images} autoPlayDelay={3000} />
					</div>
				)}

				{data.contactDepartments.length > 0 && (
					<div className='w-full md:max-w-xl'>
						<div className='flex flex-col gap-4'>
							<SectionTitle title={data.sectionTitles?.contact || "Contact Us"} />
							{data.contactDepartments.map((dept) => (
								<ContactDepartmentCard
									key={dept.id}
									title={dept.title}
									phone={dept.phone}
									whatsapp={!!dept.whatsapp}
									telegram={!!dept.telegram}
									telephone={!!dept.telephone}
									theme={theme}
								/>
							))}
						</div>
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
						<section className='grid grid-cols-1 gap-4'>
							<SectionTitle title={data.sectionTitles?.locations || "Our Locations"} />
							{data.businessLocations.map((loc, idx) => (
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
		</div>
	)
}
