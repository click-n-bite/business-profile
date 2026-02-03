"use client"

import { useState } from "react"
import { MotionDiv } from "../motion/motion-div"
import { features } from "@/data/landing"
import { useTranslations } from "next-intl"
import { SectionBadge } from "./section-badge"
import { Sparkles } from "lucide-react"

export const FeaturesSection = () => {
	const t = useTranslations("landing.features")

	const [, setHoveredIndex] = useState<number | null>(null)

	return (
		<section
			id='features'
			className='relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 px-6 py-24 dark:from-[#0B1220] dark:via-[#0F172A] dark:to-[#0B1220]'>
			<div className='absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-blue-800/30' />
			<div className='absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-blue-800/30' />

			<div className='animate-pulse-slow absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-gradient-to-r from-blue-100/40 to-cyan-100/40 blur-3xl dark:hidden' />
			<div
				className='animate-pulse-slow absolute right-1/3 -bottom-40 h-96 w-96 rounded-full bg-gradient-to-l from-blue-100/40 to-cyan-100/40 blur-3xl dark:hidden'
				style={{ animationDelay: "2s" }}
			/>

			<div className='animate-pulse-slow absolute -top-40 left-1/3 hidden h-96 w-96 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-400/5 to-transparent blur-3xl dark:block' />
			<div
				className='animate-pulse-slow absolute right-1/3 -bottom-40 hidden h-96 w-96 rounded-full bg-gradient-to-l from-blue-500/10 via-cyan-400/5 to-transparent blur-3xl dark:block'
				style={{ animationDelay: "2s" }}
			/>

			<div className='relative z-10 mx-auto max-w-7xl'>
				<div className='mb-16 text-center'>
					<MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
						<SectionBadge icon={Sparkles}>{t("sectionBadge")}</SectionBadge>

						<h2 className='mb-6 text-2xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white'>
							{t("title")}
						</h2>
						<p className='mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400'>{t("description")}</p>
					</MotionDiv>
				</div>

				<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
					{features.map((feature, index) => (
						<MotionDiv
							key={feature.title}
							initial={{ opacity: 0, y: 30, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							onHoverStart={() => setHoveredIndex(index)}
							onHoverEnd={() => setHoveredIndex(null)}
							transition={{
								duration: 0.5,
								delay: index * 0.1,
								type: "spring",
								stiffness: 100
							}}
							className='group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-lg transition-all duration-500 hover:border-cyan-400 hover:shadow-2xl dark:border-white/[0.06] dark:from-[#0F172A] dark:to-[#111827] dark:hover:border-cyan-400/50 dark:hover:shadow-cyan-500/20'>
							<div className='absolute inset-0 bg-gradient-to-br from-blue-50/30 via-cyan-50/10 to-blue-50/30 opacity-0 transition-all duration-700 group-hover:opacity-100 dark:hidden' />

							<div className='absolute inset-0 hidden bg-gradient-to-br from-blue-500/5 to-cyan-400/5 opacity-0 transition-all duration-700 group-hover:opacity-100 dark:block' />

							<MotionDiv
								whileHover={{ rotate: 12, scale: 1.1 }}
								transition={{ type: "spring", stiffness: 200 }}
								className='relative mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/15 to-cyan-400/10 shadow-lg shadow-blue-500/10'>
								<feature.icon className='h-10 w-10 text-blue-600 dark:text-cyan-400' />
							</MotionDiv>

							<h3 className='mb-4 text-2xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-cyan-400'>
								{t(feature.title)}
							</h3>

							<p className='mb-6 text-sm leading-relaxed text-slate-600 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300'>
								{t(feature.description)}
							</p>

							<div className='absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500 group-hover:w-full' />
						</MotionDiv>
					))}
				</div>
			</div>
		</section>
	)
}
