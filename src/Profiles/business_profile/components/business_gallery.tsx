/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react"
import { ImageCarousel } from "@/components/ui/image-carousel"
import Image from "next/image"

interface GalleryProps {
	images: Array<{
		id?: string | null
		image: any
	}>
	autoplay?: boolean
	autoplayDelay?: number
}

export function Gallery({ images, autoplay = true, autoplayDelay = 5000 }: GalleryProps) {
	const [isRTL, setIsRTL] = useState(false)

	useEffect(() => {
		const rtl = document.documentElement.dir === "rtl" || document.documentElement.getAttribute("lang") === "ar"

		setIsRTL(rtl)
	}, [])

	const validImages = images?.filter((item) => item && item.image) || []

	if (validImages.length === 0) return null

	if (validImages.length === 1) {
		const getImageUrl = (image: any) => {
			if (!image) return null

			if (typeof image === "string") return image

			if (image.url) return image.url

			return null
		}

		const imageUrl = getImageUrl(validImages[0].image)

		if (!imageUrl) return null

		return (
			<div className='relative h-50 w-full overflow-hidden rounded-lg'>
				<Image src={imageUrl} alt='Gallery' className='object-fill' fill loading='lazy' />
			</div>
		)
	}

	return (
		<div className='w-full'>
			<ImageCarousel
				images={validImages}
				alt='Gallery'
				className='w-full'
				hideControls={false}
				imageClass='h-50 !object-fill'
				autoPlay={autoplay}
				autoPlayDelay={autoplayDelay}
				dir={isRTL ? "rtl" : "ltr"}
			/>
		</div>
	)
}
