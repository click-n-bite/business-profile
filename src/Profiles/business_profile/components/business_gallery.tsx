/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ImageCarousel } from "@/components/ui/image-carousel"
import Image from "next/image"

interface GalleryProps {
	images: Array<{
		id?: string | null
		image: any
	}>
}

export function Gallery({ images }: GalleryProps) {
	const isRTL =
		typeof document !== "undefined"
			? document.documentElement.dir === "rtl" || document.documentElement.getAttribute("lang") === "ar"
			: false

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
		<div dir={isRTL ? "rtl" : "ltr"} className='w-full'>
			<div className={isRTL ? "scale-x-[-1]" : ""}>
				<ImageCarousel
					images={isRTL ? [...validImages].reverse() : validImages}
					alt='Gallery'
					className='w-full'
					hideControls={true}
					imageClass={`h-50 !object-fill ${isRTL ? "scale-x-[-1]" : ""}`}
					autoPlayDelay={3000}
				/>
			</div>
		</div>
	)
}
