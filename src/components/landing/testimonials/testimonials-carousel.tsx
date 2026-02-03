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
			dragFree: true,
			direction
		},
		[AutoPlay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true })]
	)

	const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])

	const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

	return (
		<div className='relative'>
			<div className='overflow-hidden py-10' ref={emblaRef}>
				<div className='flex'>
					{[...testimonials, ...testimonials].map((testimonial, index) => (
						<div key={`${testimonial.name}-${index}`} className='prevent-selection min-w-0 flex-[0_0_380px] px-4'>
							<MotionDiv
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: (index % testimonials.length) * 0.08 }}
								className='group relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg transition-all duration-300 hover:border-cyan-400/50 hover:shadow-2xl dark:border-white/[0.06] dark:from-[#0F172A] dark:to-[#111827] dark:hover:border-cyan-400/40 dark:hover:shadow-cyan-500/20'>
								<div className='absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-400/10 opacity-0 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-100' />

								<div className='absolute top-6 left-6 opacity-10 group-hover:opacity-20'>
									<Quote className='size-12 text-blue-600 dark:text-cyan-400' />
								</div>

								<div className='relative mb-6 flex items-center'>
									{[...Array(testimonial.rating)].map((_, i) => (
										<Star key={i} className='size-5 fill-current text-yellow-500 dark:text-yellow-400' />
									))}
									<span className='ml-2 text-sm font-medium text-slate-500 dark:text-slate-400'>
										{testimonial.rating}.0
									</span>
								</div>

								<p className='relative mb-8 text-base leading-relaxed text-slate-700 dark:text-slate-200'>
									“{t(testimonial.content)}”
								</p>

								<div className='flex items-center gap-4'>
									<div className='relative flex h-14 w-14 items-center justify-center rounded-full border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-cyan-400/10'>
										<span className='bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-lg font-bold text-transparent'>
											{t(testimonial.avatar)}
										</span>
									</div>

									<div>
										<p className='text-lg font-semibold text-slate-900 dark:text-white'>{t(testimonial.name)}</p>
										<p className='text-sm text-slate-500 dark:text-slate-400'>{t(testimonial.role)}</p>
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
					className='rounded-full p-3 shadow-lg hover:shadow-xl'
					aria-label='Previous testimonial'>
					<ChevronLeftIcon className='size-5 rtl:rotate-180' />
				</Button>

				<Button
					variant='outline'
					onClick={scrollNext}
					className='rounded-full p-3 shadow-lg hover:shadow-xl'
					aria-label='Next testimonial'>
					<ChevronRightIcon className='size-5 rtl:rotate-180' />
				</Button>
			</div>
		</div>
	)
}
