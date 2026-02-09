"use client"

import Image from "next/image"
import { iconMap } from "../../utils"
import { SocialLinksProps } from "@/Profiles/types"

export const SocialLinksSection = ({ socialLinks, theme }: SocialLinksProps) => {
	const primary = theme?.primaryColor || "#3B82F6"

	const activeLinks = socialLinks.sort((a, b) => (a.order || 0) - (b.order || 0)) || []

	if (activeLinks.length === 0) return null

	return (
		<section className='grid w-full grid-cols-2 gap-4 md:max-w-xl'>
			{activeLinks.map((link) => {
				const iconValue = iconMap[link.platform.toLowerCase()]

				const label = link.label || link.platform

				const isImage = typeof iconValue === "string"

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
							const icon = e.currentTarget.querySelector(".social-icon")

							const text = e.currentTarget.querySelector("span")

							if (icon) {
								if (isImage) {
									;(icon as HTMLImageElement).style.filter = `drop-shadow(0 0 8px ${primary}) opacity(0.9)`
								} else {
									;(icon as SVGElement).style.color = primary
								}
							}

							if (text) (text as HTMLElement).style.color = primary
						}}
						onMouseLeave={(e) => {
							const icon = e.currentTarget.querySelector(".social-icon")

							const text = e.currentTarget.querySelector("span")

							if (icon) {
								if (isImage) {
									;(icon as HTMLImageElement).style.filter = "none"
								} else {
									;(icon as SVGElement).style.color = "#6B7280"
								}
							}

							if (text) (text as HTMLElement).style.color = "#4B5563"
						}}>
						<div className='relative h-9 w-9'>
							{isImage ? (
								<Image src={iconValue} alt={label} fill className='social-icon object-contain' sizes='32px' />
							) : (
								<IconComponent Icon={iconValue as React.ElementType} label={label} />
							)}
						</div>
						<span className='text-[16px] font-medium text-inherit'>{label}</span>
					</a>
				)
			})}
		</section>
	)
}

const IconComponent = ({ Icon, label }: { Icon: React.ElementType; label: string }) => {
	return <Icon className='social-icon h-9 w-9 text-inherit' aria-label={label} />
}
