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
			<div className='overflow-hidden rounded-lg'>
				<Image src={imageUrl} alt='Gallery' className='h-64 w-full object-cover' fill loading='lazy' />
			</div>
		)
	}

	return (
		<ImageCarousel
			images={validImages.map((item) => ({
				id: item.id,
				image: item.image
			}))}
			alt='Gallery'
			className='w-full'
			hideControls={true}
			imageClass='h-64'
			autoPlayDelay={3000}
		/>
	)
}
