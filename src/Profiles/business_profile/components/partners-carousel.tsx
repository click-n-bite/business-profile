"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { BusinessPartner } from "@payload-types"
import { PartnerCard } from "@/Profiles/business_profile/components/partners"

export function PartnersCarousel({ partners }: { partners: BusinessPartner[] }) {
	const [emblaRef] = useEmblaCarousel(
		{
			loop: true,
			align: "start",
			slidesToScroll: 1,
			breakpoints: {
				"(min-width: 768px)": { slidesToScroll: 2 },
				"(min-width: 1024px)": { slidesToScroll: 4 }
			}
		},
		[
			Autoplay({
				delay: 5000,
				stopOnInteraction: false,
				stopOnMouseEnter: false
			})
		]
	)

	return (
		<div className='w-full overflow-hidden md:max-w-xl'>
			<div ref={emblaRef}>
				<div className='flex'>
					{partners.map((partner, index) => (
						<div key={`${partner.id || "partner"}-${index}`} className='min-w-0 flex-[0_0_50%] px-2 md:flex-[0_0_40%]'>
							<PartnerCard {...partner} />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
