"use client"

import Link from "next/link"
import { MotionDiv } from "../motion/motion-div"
import { Button } from "../ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { ROUTES } from "@/next.routes"
import { useTranslations } from "next-intl"
import { SectionBadge } from "./section-badge"

export const CtaSection = () => {
	const t = useTranslations("landing.cta")

	return (
		<section className='relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-16 dark:from-[#0c0c1e] dark:via-[#0b0b17] dark:to-[#0c0c1e]'>
			<div className='absolute inset-0 bg-gradient-to-br from-cyan-50/5 via-transparent to-blue-50/5 dark:from-cyan-400/5 dark:to-blue-900/10' />

			<div className='relative z-10 mx-auto max-w-7xl px-6'>
				<MotionDiv
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, type: "spring" }}
					className='mx-auto max-w-4xl text-center'>
					<SectionBadge
						icon={Sparkles}
						className='mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-transparent px-6 py-3 text-cyan-600 dark:text-cyan-400'>
						{t("badge")}
					</SectionBadge>

					<h2 className='mb-6 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white'>
						{t("title")}
					</h2>

					<p className='text-md mx-auto mb-10 max-w-2xl leading-relaxed text-slate-500 dark:text-slate-300'>
						{t("description")}
					</p>

					<MotionDiv
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
						className='mb-12 flex flex-wrap justify-center gap-8'>
						{[
							{ value: t("stats.users.value"), label: t("stats.users.label") },
							{ value: t("stats.satisfaction.value"), label: t("stats.satisfaction.label") },
							{ value: t("stats.support.value"), label: t("stats.support.label") },
							{ value: t("stats.features.value"), label: t("stats.features.label") }
						].map((stat, index) => (
							<div key={index} className='group/stat relative'>
								<div className='relative rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/20'>
									<div className='text-3xl font-bold text-blue-600 dark:text-cyan-400'>{stat.value}</div>
									<div className='text-sm text-slate-400'>{stat.label}</div>
								</div>
							</div>
						))}
					</MotionDiv>

					<div className='flex flex-col justify-center gap-4 sm:flex-row'>
						<Button asChild size='lg' variant='outline' className='px-8 py-4'>
							<Link href={ROUTES.CONTACT} target='_blank' rel='noopener noreferrer'>
								{t("actions.contact")}{" "}
								<ArrowRight className='transition-basic size-5 group-hover/contact-button:[animation:slide-x_1s_ease-in-out_infinite] rtl:rotate-180' />
							</Link>
						</Button>

						<Button asChild size='lg' variant='gradient' className='px-8 py-4 text-white'>
							<Link href={ROUTES.DEMO}>{t("actions.demo")}</Link>
						</Button>
					</div>
				</MotionDiv>
			</div>

			<div className='absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-blue-50 to-slate-50 dark:from-[#0b0b17] dark:to-transparent'></div>
		</section>
	)
}
