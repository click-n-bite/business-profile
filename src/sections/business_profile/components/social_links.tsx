"use client"

import { iconMap } from "../../utils"
import { SocialLinksProps } from "@/sections/types"

export const SocialLinksSection = ({ socialLinks, theme }: SocialLinksProps) => {
	const primary = theme?.primaryColor || "#3B82F6"

	const activeLinks = socialLinks.sort((a, b) => (a.order || 0) - (b.order || 0)) || []

	if (activeLinks.length === 0) return null

	return (
		<section className='grid w-full grid-cols-2 gap-4 md:max-w-xl'>
			{activeLinks.map((link) => {
				const Icon = iconMap[link.platform.toLowerCase()]

				const label = link.label || link.platform

				return (
					<a
						key={link.id}
						href={link.url}
						target='_blank'
						rel='noopener noreferrer'
						className='group dark:bg-card/40 relative flex h-30 w-full flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/5'
						style={{
							color: "#6B7280"
						}}
						onMouseEnter={(e) => {
							const icon = e.currentTarget.querySelector("svg")

							const text = e.currentTarget.querySelector("span")

							if (icon) (icon as SVGElement).style.color = primary

							if (text) (text as HTMLElement).style.color = primary
						}}
						onMouseLeave={(e) => {
							const icon = e.currentTarget.querySelector("svg")

							const text = e.currentTarget.querySelector("span")

							if (icon) (icon as unknown as SVGElement).style.color = "#6B7280"

							if (text) (text as HTMLElement).style.color = "#4B5563"
						}}>
						<div className='relative'>
							<Icon className='h-8 w-8 text-inherit' />
						</div>
						<span className='text-[16px] font-medium text-inherit'>{label}</span>
					</a>
				)
			})}
		</section>
	)
}
