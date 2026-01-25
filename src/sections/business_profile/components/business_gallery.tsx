/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useState } from "react"
import { ImageMedia } from "@/components/payload/image-media"

interface ImageGalleryProps {
	images:
		| Array<{
				id?: string | null
				image: any
		  }>
		| null
		| undefined
	autoPlayDelay?: number
	showDots?: boolean
}

export function BusinessGallery({ images, autoPlayDelay = 5000, showDots = true }: ImageGalleryProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			align: "center",
			// duration: 100,
			skipSnaps: false
		},
		[Autoplay({ delay: autoPlayDelay, stopOnInteraction: false })]
	)

	const [selectedIndex, setSelectedIndex] = useState(0)

	const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

	const onSelect = () => {
		if (!emblaApi) return

		setSelectedIndex(emblaApi.selectedScrollSnap())
	}

	const scrollTo = (index: number) => {
		if (emblaApi) {
			emblaApi.scrollTo(index)
		}
	}

	useEffect(() => {
		if (!emblaApi) return

		onSelect()
		setScrollSnaps(emblaApi.scrollSnapList())

		emblaApi.on("select", onSelect)
		emblaApi.on("reInit", () => {
			setScrollSnaps(emblaApi.scrollSnapList())
			onSelect()
		})

		return () => {
			emblaApi.off("select", onSelect)
		}
	}, [emblaApi])

	const validImages = images?.filter((item) => item && item.image && typeof item.image !== "string") || []

	if (validImages.length === 0) {
		return (
			<div className='flex h-64 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800'>
				<p className='text-slate-500 dark:text-slate-400'>No images available</p>
			</div>
		)
	}

	return (
		<div className='relative w-full overflow-hidden rounded-2xl md:max-w-xl'>
			<div ref={emblaRef} className='overflow-hidden rounded-2xl shadow-lg'>
				<div className='flex'>
					{validImages.map((item, index) => (
						<div key={item.id || index} className='relative min-w-0 flex-[0_0_100%]'>
							<div className='relative aspect-video h-[400px] w-full overflow-hidden'>
								<ImageMedia
									resource={item.image}
									alt={item.image?.alt || "Business images"}
									className='h-full w-full object-cover'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent' />
							</div>
						</div>
					))}
				</div>
			</div>

			{showDots && validImages.length > 1 && scrollSnaps.length > 1 && (
				<div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2'>
					{scrollSnaps.map((_, index) => (
						<button
							key={index}
							onClick={() => scrollTo(index)}
							className={`h-2 rounded-full transition-all duration-300 ${
								index === selectedIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			)}
		</div>
	)
}
