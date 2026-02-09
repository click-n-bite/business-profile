"use client"

import { BusinessPartner } from "@payload-types"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { PartnerCard } from "./partners"

interface PartnersCarouselProps {
	partners: BusinessPartner[]
	autoplay?: boolean
	autoplaySpeed?: number
}

export function PartnersCarousel({ partners, autoplay = true, autoplaySpeed = 5000 }: PartnersCarouselProps) {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		autoplay: autoplay,
		autoplaySpeed: autoplaySpeed,
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: false,
		pauseOnHover: true,
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
						<PartnerCard {...partner} name={partner.name} logo={partner.logo} />
					</div>
				))}
			</Slider>
		</div>
	)
}
