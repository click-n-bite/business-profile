import { Star } from "lucide-react"
import { TestimonialsCarousel } from "./testimonials-carousel"
import { SectionBadge } from "../section-badge"
import { useTranslations } from "next-intl"

export const TestimonialsSection = () => {
	const t = useTranslations("landing.testimonials")

	return (
		<section
			id='clients'
			className='relative bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24 dark:from-[#0B1220] dark:via-[#0F172A] dark:to-[#0B1220]'>
			<div className='custom-container'>
				<div className='mb-16 text-center'>
					<SectionBadge icon={Star}>{t("sectionBadge")}</SectionBadge>

					<h2 className='mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white'>{t("title")}</h2>
					<p className='mx-auto max-w-3xl text-xl text-slate-600 dark:text-slate-300'>{t("description")}</p>
				</div>

				<TestimonialsCarousel />
			</div>
		</section>
	)
}
