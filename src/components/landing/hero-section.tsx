import { ArrowRight, MessageCircle, Sparkles, Zap } from "lucide-react"
import Link from "next/link"
import { MotionDiv } from "../motion/motion-div"
import { Button } from "../ui/button"
import { ROUTES } from "@/next.routes"
import { BlobsBackground } from "./blobs-background"
import { SectionBadge } from "./section-badge"
import { useTranslations } from "next-intl"

export const HeroSection = () => {
	const t = useTranslations("landing.hero")

	return (
		<section className='relative overflow-hidden py-24'>
			<BlobsBackground />

			<div className='custom-container relative z-10'>
				<div className='mx-auto max-w-3xl text-center'>
					<MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
						<SectionBadge
							icon={Sparkles}
							className='mb-8 inline-flex items-center gap-2 rounded-full border border-[#bbf451]/30 bg-gradient-to-r from-[#bbf451]/20 to-[#bbf451]/10 px-6 py-3 text-emerald-600 dark:text-white'>
							{t("sectionBadge")}
						</SectionBadge>

						<h1 className='mb-6 text-4xl leading-tight font-extrabold md:text-6xl'>
							{t.rich("title", {
								span: (chunks) => (
									<span className='bg-gradient-to-r from-[#06bd7a] via-lime-500 to-emerald-500 bg-clip-text text-transparent rtl:bg-gradient-to-l'>
										{chunks}
									</span>
								)
							})}
						</h1>

						<p className='mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300'>
							{t("description")}
						</p>

						{/* CTA buttons */}
						<div className='mb-6 flex flex-col gap-3 sm:flex-row sm:justify-center'>
							<Button asChild size='lg' variant='gradient' className='group w-full sm:w-auto'>
								<Link href={ROUTES.DEMO}>
									<Zap />
									{t("actions.demo")}
									<ArrowRight className='ms-1 transition-transform group-hover:translate-x-1 rtl:rotate-180' />
								</Link>
							</Button>

							<Button
								asChild
								size='lg'
								variant='outline'
								className='w-full border-lime-200 text-lime-700 hover:bg-lime-50 sm:w-auto dark:border-lime-700 dark:text-lime-300 dark:hover:bg-lime-900/20'>
								<Link href={ROUTES.CONTACT}>
									<MessageCircle />
									{t("actions.contact")}
								</Link>
							</Button>
						</div>

						<p className='text-sm text-gray-500 dark:text-gray-400'>{t("slogan")}</p>
					</MotionDiv>
				</div>
			</div>
		</section>
	)
}
