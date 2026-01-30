"use client"

import { BusinessPartner } from "@payload-types"
import { PartnerCard } from "@/Profiles/business_profile/components/partners"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export function PartnersCarousel({ partners }: { partners: BusinessPartner[] }) {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 2,
		slidesToScroll: 2,
		arrows: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}
		]
	}

	return (
		<div className='w-full md:max-w-xl'>
			<Slider {...settings}>
				{partners.map((partner, index) => (
					<div key={`${partner.id || "partner"}-${index}`} className='px-2'>
						<PartnerCard {...partner} />
					</div>
				))}
			</Slider>
		</div>
	)
}
