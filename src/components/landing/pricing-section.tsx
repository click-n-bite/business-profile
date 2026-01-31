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
		<section id='pricing' className='relative overflow-hidden py-10 dark:bg-black'>
			<div className='custom-container relative z-10'>
				<div className='mb-14 text-center'>
					<SectionBadge
						icon={CreditCard}
						className='mb-4 inline-flex items-center gap-2 rounded-full px-6 py-3 text-emerald-600 dark:text-[#06bd7a]'>
						{t("sectionBadge")}
					</SectionBadge>

					<h2 className='mb-4 text-3xl font-bold md:text-4xl'>{t("title")}</h2>
					<p className='text-muted-foreground mx-auto max-w-2xl text-lg'>{t("description")}</p>

					<div className='mt-8 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 p-1 dark:border-emerald-700 dark:bg-lime-900/20'>
						{(["monthly", "annually"] as const).map((cycle) => (
							<button
								key={cycle}
								onClick={() => setBillingCycle(cycle)}
								data-active={billingCycle === cycle}
								className={cn(
									"rounded-full px-6 py-2 text-sm font-medium transition-all",
									"data-[active=true]:bg-gradient-to-r data-[active=true]:from-[#06bd7a] data-[active=true]:to-lime-500",
									"data-[active=true]:text-white data-[active=true]:shadow-md"
								)}>
								{t(`billingCycle.${cycle}`)}
							</button>
						))}
					</div>
				</div>

				<MotionDiv
					{...slideUpVariants}
					className='relative mx-auto max-w-md rounded-3xl border border-emerald-200 bg-white/70 p-8 backdrop-blur-xl dark:border-lime-800 dark:bg-transparent'>
					<div className='pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#06bd7a]/10 to-lime-500/10 blur-2xl' />

					<div className='relative z-10 text-center'>
						<div className='mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#06bd7a] to-lime-500 px-4 py-1.5 text-sm font-medium text-white'>
							<Sparkles className='size-4' />
							{t("plan.title")}
						</div>

						<div className='mb-2 text-5xl font-extrabold'>
							{billingCycle === "monthly" ? basePrice : Math.round(annualPrice / 12)}
							<span className='text-muted-foreground ms-2 text-base font-medium'>/{t("plan.perMonth")}</span>
						</div>

						{billingCycle === "annually" && (
							<p className='mb-4 text-sm font-medium text-lime-600 dark:text-lime-400'>
								{t.rich("plan.discount", {
									price: annualPrice,
									discount: Math.round(basePrice * 12 - annualPrice)
								})}
							</p>
						)}

						<ul className='my-8 space-y-3 text-left'>
							{pricingPlanFeatures.map((feature, index) => (
								<li key={index} className='flex items-center gap-3'>
									<Check className='size-5 text-lime-500' />
									<span className='text-muted-foreground'>{t(feature)}</span>
								</li>
							))}
						</ul>

						<Button
							// onClick={() => handlePricingSelect(billingCycle)}
							size='lg'
							variant='gradient'
							className='w-full text-lg'>
							<Link href={ROUTES.CONTACT} target='_blank' rel='noopener noreferrer'>
								{t("plan.actions.monthly.getStarted")}
							</Link>
						</Button>

						<p className='text-muted-foreground mt-4 text-sm'>{t("footerMessage")}</p>
					</div>
				</MotionDiv>
			</div>
		</section>
	)
}
