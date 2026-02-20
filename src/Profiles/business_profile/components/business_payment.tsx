"use client"

import { Setting } from "@payload-types"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { ExternalLink } from "lucide-react"

interface PaymentMethodsProps {
	settings?: Setting
	onSelectMethod: (method: "whish" | "stripe") => void
	theme?: {
		primaryColor?: string
	}
}

export const PaymentMethods = ({ settings, onSelectMethod, theme }: PaymentMethodsProps) => {
	const t = useTranslations("Payment")

	const primary = theme?.primaryColor

	if (!settings) return null

	const { enableWhish, enableStripe } = settings

	if (!enableWhish && !enableStripe) return null

	return (
		<div className='space-y-3'>
			<div className='grid gap-3'>
				{enableWhish && (
					<button
						onClick={() => onSelectMethod("whish")}
						className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[${primary}] dark:bg-card/40 border-slate-200 bg-white hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/5 dark:hover:shadow-lg`}>
						<div className='flex items-center gap-3'>
							<div className={`rounded-lg bg-[#e9e9e9] p-2.5 text-black dark:bg-[#191919] dark:text-white`}>
								<Image
									src='/images/whish.jpg'
									alt={t("whish.alt")}
									width={20}
									height={20}
									className='h-10 w-10 rounded-md object-cover transition-all duration-300'
								/>
							</div>
							<div className='text-start'>
								<h3 className='text-md font-semibold text-slate-900 dark:text-white'>{t("whish.title")}</h3>
								<p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>{t("whish.description")}</p>
							</div>
						</div>
						<ExternalLink className='h-4 w-4 text-slate-400' />
					</button>
				)}

				{enableStripe && (
					<button
						onClick={() => onSelectMethod("stripe")}
						className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[${primary}] dark:bg-card/40 border-slate-200 bg-white hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/5 dark:hover:shadow-lg`}>
						<div className='flex items-center gap-3'>
							<div className={`rounded-lg bg-[#e9e9e9] p-2.5 text-black dark:bg-[#191919] dark:text-white`}>
								<Image
									src='/images/atm-card.png'
									alt={t("stripe.alt")}
									width={20}
									height={20}
									className='h-10 w-10 object-contain transition-all duration-300'
								/>
							</div>
							<div className='text-start'>
								<h3 className='text-md font-semibold text-slate-900 dark:text-white'>{t("stripe.title")}</h3>
								<p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>{t("stripe.description")}</p>
							</div>
						</div>
						<ExternalLink className='h-4 w-4 text-slate-400' />
					</button>
				)}
			</div>
		</div>
	)
}
