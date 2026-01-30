"use client"

import { useCallback } from "react"
import { ChevronLeftIcon, ChevronRightIcon, Star, Quote } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import AutoPlay from "embla-carousel-autoplay"
import { MotionDiv } from "@/components/motion/motion-div"
import { testimonials } from "@/data/landing"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { useDirection } from "@radix-ui/react-direction"

export const TestimonialsCarousel = () => {
	const t = useTranslations("landing.testimonials.clientTestimonials")

	const direction = useDirection()

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			align: "center",
			skipSnaps: false,
			dragFree: true,
			direction
		},
		[AutoPlay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true })]
	)

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev()
	}, [emblaApi])

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext()
	}, [emblaApi])

	return (
		<div className='relative'>
			<div className='overflow-hidden py-10' ref={emblaRef}>
				<div className='flex'>
					{[...testimonials, ...testimonials].map((testimonial, index) => (
						<div key={`${testimonial.name}-${index}`} className='prevent-selection min-w-0 flex-[0_0_380px] px-4'>
							<MotionDiv
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: (index % testimonials.length) * 0.08 }}
								className='group border-border/50 from-background to-secondary/20 relative h-full overflow-hidden rounded-3xl border bg-gradient-to-br p-8 shadow-lg transition-all duration-300 hover:border-emerald-500/30 hover:shadow-2xl dark:from-gray-900 dark:to-gray-800/30 dark:hover:border-emerald-500/50'>
								<div className='absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-r from-emerald-500/5 via-emerald-500/10 to-transparent blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:from-emerald-500/10 group-hover:via-emerald-500/20'></div>
								<div className='from-secondary/5 via-secondary/10 group-hover:from-secondary/10 group-hover:via-secondary/20 absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-r to-transparent blur-2xl transition-all duration-500 group-hover:scale-125'></div>

								<div className='absolute top-6 left-6 opacity-10 transition-opacity duration-300 group-hover:opacity-20'>
									<Quote className='size-12 text-emerald-500' />
								</div>

								<div className='relative mb-6 flex items-center'>
									{[...Array(testimonial.rating)].map((_, i) => (
										<Star key={i} className='size-5 fill-current text-yellow-500 dark:text-yellow-400' />
									))}
									<span className='text-muted-foreground ml-2 text-sm font-medium'>{testimonial.rating}.0</span>
								</div>

								<p className='text-foreground/90 relative mb-8 text-base leading-relaxed dark:text-gray-200'>
									&quot;{t(testimonial.content)}&quot;
								</p>

								<div className='relative flex items-center gap-4'>
									<div className='relative'>
										<div className='absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-500 via-lime-500 to-emerald-500 opacity-30 blur transition-all duration-500 group-hover:opacity-50 group-hover:blur-md'></div>
										<div className='relative flex h-16 w-16 items-center justify-center rounded-full border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 via-lime-500/5 to-emerald-500/10'>
											<div className='bg-gradient-to-r from-yellow-500 via-lime-500 to-emerald-500 bg-clip-text text-xl font-bold text-transparent'>
												{t(testimonial.avatar)}
											</div>
										</div>
									</div>

									<div>
										<p className='text-foreground text-lg font-semibold dark:text-white'>{t(testimonial.name)}</p>
										<p className='text-muted-foreground text-sm dark:text-gray-400'>{t(testimonial.role)}</p>
									</div>
								</div>
							</MotionDiv>
						</div>
					))}
				</div>
			</div>

			<div className='mt-8 flex justify-center gap-4'>
				<Button
					variant='outline'
					onClick={scrollPrev}
					className='h-max rounded-full p-3 shadow-lg hover:shadow-xl'
					aria-label='Previous testimonial'>
					<ChevronLeftIcon className='size-5 rtl:rotate-180' />
				</Button>
				<Button
					variant='outline'
					onClick={scrollNext}
					className='h-max rounded-full border p-3 shadow-lg hover:shadow-xl'
					aria-label='Next testimonial'>
					<ChevronRightIcon className='size-5 rtl:rotate-180' />
				</Button>
			</div>
		</div>
	)
}
