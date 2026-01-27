/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useCallback, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"
import Fade from "embla-carousel-fade"
import { ImageMedia } from "@/components/payload/image-media"

interface ImageCarouselProps {
	images: Array<{
		id?: string | null
		image: any
	}>
	alt?: string
	className?: string
	hideControls?: boolean
	imageClass?: string
	autoPlayDelay?: number
}

export function ImageCarousel({
	images,
	alt = "Gallery image",
	className = "",
	hideControls,
	imageClass = "",
	autoPlayDelay = 2000
}: ImageCarouselProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			active: images?.length > 1,
			loop: true,
			skipSnaps: true
		},
		[
			Autoplay({
				delay: autoPlayDelay,
				jump: false,
				stopOnInteraction: true,
				stopOnMouseEnter: true
			}),
			Fade()
		]
	)

	const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])

	const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

	const toggleAutoplay = useCallback(() => {
		if (!emblaRef || !emblaApi) return

		const autoPlay = emblaApi?.plugins()?.autoplay

		if (!autoPlay) return

		const isPlaying = autoPlay?.isPlaying() || false

		if (!isPlaying) autoPlay?.play()
	}, [emblaApi, emblaRef])

	useEffect(() => {
		if (emblaApi && images?.length > 1) {
			const autoplay = emblaApi.plugins().autoplay

			if (autoplay) {
				autoplay.play()
			}
		}
	}, [emblaApi, images?.length])

	// Filter valid images
	const validImages = images?.filter((item) => item && item.image && typeof item.image !== "string") || []

	if (validImages.length === 0) {
		return (
			<div className='flex h-64 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800'>
				<p className='text-slate-500 dark:text-slate-400'>No images available</p>
			</div>
		)
	}

	if (validImages.length === 1) {
		return (
			<div className={`relative size-full bg-transparent ${className}`}>
				<ImageMedia
					resource={validImages[0].image}
					alt={alt}
					className={`w-full rounded-xl bg-transparent object-cover ${imageClass}`}
				/>
			</div>
		)
	}

	return (
		<div
			onMouseLeave={toggleAutoplay}
			className={`relative m-auto overflow-hidden rounded-2xl ${className}`}
			style={
				{
					"--slide-height": "400px",
					"--slide-spacing": "0px",
					"--slide-size": "100%"
				} as React.CSSProperties
			}>
			<div ref={emblaRef} className='overflow-hidden'>
				<div className='-ms-[var(--slide-spacing)] flex touch-pan-y touch-pinch-zoom'>
					{validImages.map((item, index) => (
						<div
							key={item.id || index}
							className='!h-full min-w-0 !flex-[0_0_var(--slide-size)] translate-x-0 translate-y-0 translate-z-0 ps-[var(--slide-spacing)]'>
							<div className='relative h-[var(--slide-height)] w-full overflow-hidden'>
								<ImageMedia resource={item.image} alt={alt} className={`h-full w-full object-cover ${imageClass}`} />
							</div>
						</div>
					))}
				</div>
			</div>

			{validImages.length > 1 && !hideControls && (
				<>
					<button
						onClick={scrollPrev}
						className='absolute top-1/2 left-4 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/70'
						aria-label='Previous image'>
						<ChevronLeft className='h-5 w-5' />
					</button>
					<button
						onClick={scrollNext}
						className='absolute top-1/2 right-4 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/70'
						aria-label='Next image'>
						<ChevronRight className='h-5 w-5' />
					</button>
				</>
			)}
		</div>
	)
}
