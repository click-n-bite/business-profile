"use client"

import Link from "next/link"
import { MotionDiv } from "../motion/motion-div"
import { Button } from "../ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { ROUTES } from "@/next.routes"
import { useTranslations } from "next-intl"

export const CtaSection = () => {
	const t = useTranslations("landing.cta")

	return (
		<section className='relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-10 dark:from-[#0c0c0e] dark:via-[#070707] dark:to-[#0c0c0e]'>
			<div className='absolute inset-0 bg-gradient-to-br from-[#bbf451]/5 via-transparent to-[#bbf451]/5'></div>

			<div className='absolute inset-0 overflow-hidden'>
				{[...Array(20)].map((_, i) => (
					<div
						key={i}
						className='animate-float absolute h-1 w-1 rounded-full bg-[#bbf451]'
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 5}s`,
							animationDuration: `${3 + Math.random() * 4}s`,
							opacity: 0.3 + Math.random() * 0.4
						}}
					/>
				))}
			</div>

			<div className='animate-blob-slow absolute top-20 left-1/4 size-96 rounded-full bg-gradient-to-r from-[#bbf451]/20 via-[#bbf451]/10 to-transparent blur-3xl' />
			<div className='animate-blob-slow animation-delay-2000 absolute right-1/4 bottom-20 size-96 rounded-full bg-gradient-to-l from-[#bbf451]/20 via-[#bbf451]/10 to-transparent blur-3xl' />
			<div className='animate-blob-slow animation-delay-4000 absolute bottom-10 left-1/3 size-80 rounded-full bg-gradient-to-tr from-[#bbf451]/15 to-transparent blur-3xl' />

			<div className='relative z-10 mx-auto max-w-7xl px-6'>
				<MotionDiv
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, type: "spring" }}
					className='mx-auto max-w-4xl text-center'>
					<MotionDiv
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2 }}
						className='mb-8 inline-flex items-center gap-2 rounded-full border border-[#bbf451]/30 bg-gradient-to-r from-[#bbf451]/20 to-[#bbf451]/10 px-6 py-3'>
						<Sparkles className='size-5 text-emerald-600' />
						<span className='text-sm font-semibold text-emerald-600 dark:text-white'>{t("badge")}</span>
						<Sparkles className='size-5 text-emerald-600' />
					</MotionDiv>

					<h2 className='mb-6 text-5xl font-bold tracking-tight text-black md:text-6xl lg:text-4xl dark:text-white'>
						{t("title")}
						<span className='block bg-gradient-to-r from-[#bbf451] via-emerald-400 to-emerald-400 bg-clip-text pb-4 text-transparent'>
							{t("subtitle")}
						</span>
					</h2>

					<p className='text-md mx-auto mb-10 max-w-2xl leading-relaxed text-gray-400 dark:text-slate-300'>
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
								<div className='absolute -inset-1 rounded-full bg-gradient-to-r from-[#bbf451]/20 to-transparent opacity-0 blur transition-opacity duration-500 group-hover/stat:opacity-100'></div>
								<div className='relative rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 backdrop-blur-sm'>
									<div className='text-3xl font-bold text-[#06bd7a] dark:text-[#bbf451]'>{stat.value}</div>
									<div className='text-sm text-slate-400'>{stat.label}</div>
								</div>
							</div>
						))}
					</MotionDiv>

					<div className='flex flex-col justify-center gap-4 sm:flex-row'>
						<Button asChild size='lg' variant='outline' className='px-8 py-4'>
							<Link href={ROUTES.CONTACT}>
								{t("actions.contact")}{" "}
								<ArrowRight className='transition-basic size-5 group-hover/contact-button:[animation:slide-x_1s_ease-in-out_infinite] rtl:rotate-180' />
							</Link>
						</Button>
						<Button asChild size='lg' variant='gradient' className='px-8 py-4 text-white'>
							<Link href={ROUTES.DEMO}>{t("actions.demo")}</Link>
						</Button>
					</div>

					<MotionDiv
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1 }}
						className='mt-16 overflow-hidden'>
						<div className='animate-marquee flex whitespace-nowrap'>
							{[...Array(4)].map((_, index) => (
								<div key={index} className='mx-8 flex items-center gap-3'>
									<span className='text-lg font-semibold text-black dark:text-slate-300'>{t("marquee.label")}</span>
									<span className='text-lg text-[#06bd7a] dark:text-slate-400'>{t("marquee.types.startups")}</span>
									<div className='h-6 w-px bg-slate-700'></div>
									<span className='text-lg text-[#06bd7a] dark:text-slate-400'>{t("marquee.types.agencies")}</span>
									<div className='h-6 w-px bg-slate-700'></div>
									<span className='text-lg text-[#06bd7a] dark:text-slate-400'>{t("marquee.types.enterprises")}</span>
									<div className='h-6 w-px bg-slate-700'></div>
									<span className='text-lg text-[#06bd7a] dark:text-slate-400'>{t("marquee.types.creators")}</span>
								</div>
							))}
						</div>
					</MotionDiv>
				</MotionDiv>
			</div>

			<div className='absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-emerald-50 to-gray-50 dark:from-[#070707] dark:to-transparent'></div>
		</section>
	)
}
