"use client"

import { useState } from "react"
import { MotionDiv } from "../motion/motion-div"
import { Check, CreditCard, Sparkles } from "lucide-react"
import { Button } from "../ui/button"
import { SectionBadge } from "./section-badge"
import { slideUpVariants } from "@/lib/motion/configs"
import { cn } from "@/utils/cn"
import { annualPrice, basePrice } from "@/constants/pricing"
import { pricingPlanFeatures } from "@/data/landing"
import { ROUTES } from "@/next.routes"
import { useTranslations } from "next-intl"
import Link from "next/link"

export const PricingSection = () => {
	const t = useTranslations("landing.pricing")

	const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly")

	return (
		<section id='pricing' className='relative overflow-hidden bg-[#38BDF8]/5 py-16 dark:bg-[#0c0c1e]'>
			<div className='custom-container relative z-10'>
				<div className='mb-14 text-center'>
					<SectionBadge
						icon={CreditCard}
						className='mb-4 inline-flex items-center gap-2 rounded-full px-6 py-3 text-cyan-600 dark:text-cyan-400'>
						{t("sectionBadge")}
					</SectionBadge>

					<h2 className='mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white'>{t("title")}</h2>
					<p className='mx-auto max-w-2xl text-lg text-slate-500 dark:text-slate-300'>{t("description")}</p>

					<div className='mt-8 inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 p-1 dark:border-cyan-700 dark:bg-blue-900/20'>
						{(["monthly", "annually"] as const).map((cycle) => (
							<button
								key={cycle}
								onClick={() => setBillingCycle(cycle)}
								data-active={billingCycle === cycle}
								className={cn(
									"rounded-full px-6 py-2 text-sm font-medium transition-all",
									"data-[active=true]:bg-gradient-to-r data-[active=true]:from-cyan-500 data-[active=true]:to-blue-500",
									"data-[active=true]:text-white data-[active=true]:shadow-md"
								)}>
								{t(`billingCycle.${cycle}`)}
							</button>
						))}
					</div>
				</div>

				<MotionDiv
					{...slideUpVariants}
					className='relative mx-auto max-w-md rounded-3xl border border-cyan-200 bg-white/70 p-8 backdrop-blur-xl dark:border-cyan-800 dark:bg-transparent'>
					<div className='pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/10 to-blue-500/10 blur-2xl' />

					<div className='relative z-10 text-center'>
						<div className='mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1.5 text-sm font-medium text-white'>
							<Sparkles className='size-4' />
							{t("plan.title")}
						</div>

						<div className='mb-2 text-5xl font-extrabold text-slate-900 dark:text-white'>
							{billingCycle === "monthly" ? basePrice : Math.round(annualPrice / 12)}$
						</div>

						{billingCycle === "annually" && (
							<p className='mb-4 text-sm font-medium text-cyan-500 dark:text-cyan-400'>
								{t.rich("plan.discount", {
									price: annualPrice,
									discount: Math.round(basePrice * 12 - annualPrice)
								})}
							</p>
						)}

						<ul className='my-8 space-y-3 text-left'>
							{pricingPlanFeatures.map((feature, index) => (
								<li key={index} className='flex items-center gap-3'>
									<Check className='size-5 text-cyan-500' />
									<span className='text-slate-700 dark:text-slate-300'>{t(feature)}</span>
								</li>
							))}
						</ul>

						<Button size='lg' variant='gradient' className='w-full text-lg'>
							<Link href={ROUTES.CONTACT} target='_blank' rel='noopener noreferrer'>
								{t("plan.actions.monthly.getStarted")}
							</Link>
						</Button>

						<p className='mt-4 text-sm text-slate-500 dark:text-slate-400'>{t("footerMessage")}</p>
					</div>
				</MotionDiv>
			</div>
		</section>
	)
}
