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
			className='relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 px-6 py-24 dark:from-[#070707] dark:via-[#0c0c0e] dark:to-[#070707]'>
			<div className='absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-[#bbf451]/20' />
			<div className='absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-[#bbf451]/20' />

			<div className='animate-pulse-slow absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-gradient-to-r from-yellow-100/50 to-emerald-100/50 blur-3xl dark:hidden'></div>
			<div
				className='animate-pulse-slow absolute right-1/3 -bottom-40 h-96 w-96 rounded-full bg-gradient-to-l from-yellow-100/50 to-emerald-100/50 blur-3xl dark:hidden'
				style={{ animationDelay: "2s" }}></div>

			<div className='animate-pulse-slow absolute -top-40 left-1/3 hidden h-96 w-96 rounded-full bg-gradient-to-r from-[#bbf451]/10 via-[#bbf451]/5 to-transparent blur-3xl dark:block'></div>
			<div
				className='animate-pulse-slow absolute right-1/3 -bottom-40 hidden h-96 w-96 rounded-full bg-gradient-to-l from-[#bbf451]/10 via-[#bbf451]/5 to-transparent blur-3xl dark:block'
				style={{ animationDelay: "2s" }}></div>

			<div className='relative z-10 mx-auto max-w-7xl'>
				<div className='mb-16 text-center'>
					<MotionDiv
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='relative'>
						<div className='mb-4 inline-block'>
							<SectionBadge
								icon={Sparkles}
								className='mb-4 inline-flex items-center gap-2 rounded-full px-6 py-3 text-emerald-600 dark:text-[#06bd7a]'>
								{t("sectionBadge")}
							</SectionBadge>
						</div>

						<h2 className='mb-6 text-2xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white'>
							{t("title")}
						</h2>
						<p className='mx-auto max-w-2xl text-lg text-gray-600 dark:text-slate-400'>{t("description")}</p>
					</MotionDiv>
				</div>

				<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
					{features.map((feature, index) => (
						<MotionDiv
							key={feature.title}
							initial={{ opacity: 0, y: 30, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							whileHover={{
								transition: { type: "spring", stiffness: 300 }
							}}
							onHoverStart={() => setHoveredIndex(index)}
							onHoverEnd={() => setHoveredIndex(null)}
							transition={{
								duration: 0.5,
								delay: index * 0.1,
								type: "spring",
								stiffness: 100
							}}
							className='group relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 shadow-lg transition-all duration-500 hover:border-[#06bd7a] hover:shadow-2xl dark:border-white/[0.05] dark:from-[#0c0c0e] dark:to-[#111113] dark:hover:border-[#06bd7a]/50 dark:hover:shadow-[#06bd7a]/20'>
							{/* Light mode gradients */}
							<div className='absolute inset-0 bg-gradient-to-br from-yellow-50/20 via-lime-50/10 to-emerald-50/20 opacity-0 transition-all duration-700 group-hover:opacity-100 dark:hidden'></div>

							{/* Dark mode gradients */}
							<div className='absolute inset-0 hidden bg-gradient-to-br from-[#06bd7a]/5 to-[#bbf451]/2 opacity-0 transition-all duration-700 group-hover:opacity-100 dark:block'></div>

							{/* Light mode background blobs */}
							<div className='absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-r from-[#06bd7a]/10 to-emerald-400/10 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-80 dark:hidden'></div>
							<div className='absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-r from-transparent to-emerald-400/10 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-80 dark:hidden'></div>

							{/* Dark mode background blobs */}
							<div className='absolute -top-20 -right-20 hidden h-40 w-40 rounded-full bg-gradient-to-r from-[#bbf451]/10 to-[#06bd7a]/20 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-80 dark:block'></div>
							<div className='absolute -bottom-20 -left-20 hidden h-40 w-40 rounded-full bg-gradient-to-r from-[#06bd7a]/20 to-[#bbf451]/10 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-80 dark:block'></div>

							<MotionDiv
								whileHover={{ rotate: 15, scale: 1.1 }}
								transition={{ type: "spring", stiffness: 200 }}
								className='relative mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#06bd7a]/20 bg-gradient-to-br from-[#06bd7a]/15 to-emerald-400/10 shadow-lg shadow-[#06bd7a]/10 dark:border-[#06bd7a]/20 dark:from-[#06bd7a]/15 dark:to-[#06bd7a]/5 dark:shadow-[#06bd7a]/10'>
								<div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-[#06bd7a]/20 to-[#bbf451]/10 opacity-0 transition-opacity duration-500 dark:from-[#bbf451]/20'></div>
								<feature.icon className='relative z-10 h-10 w-10 text-[#06bd7a]' />

								<div className='absolute -top-2 -right-2 h-4 w-4 rounded-full bg-[#06bd7a]/30 blur-sm dark:hidden'></div>
								<div className='absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-emerald-400/30 blur-sm dark:hidden'></div>

								<div className='absolute -top-2 -right-2 hidden h-4 w-4 rounded-full bg-[#06bd7a]/30 blur-sm dark:block'></div>
								<div className='absolute -bottom-2 -left-2 hidden h-4 w-4 rounded-full bg-[#06bd7a]/30 blur-sm dark:block'></div>
							</MotionDiv>

							<h3 className='mb-4 text-2xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-emerald-500 dark:text-white dark:group-hover:text-[#06bd7a]'>
								{t(feature.title)}
							</h3>

							<p className='mb-6 text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700 dark:text-slate-400 dark:group-hover:text-slate-300'>
								{t(feature.description)}
							</p>

							<div className='absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#06bd7a] to-emerald-400 transition-all duration-500 group-hover:w-full dark:from-[#bbf451] dark:to-emerald-500'></div>
						</MotionDiv>
					))}
				</div>
			</div>
		</section>
	)
}
