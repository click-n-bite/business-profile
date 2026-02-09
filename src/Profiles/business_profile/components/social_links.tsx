"use client"

import Image from "next/image"
import { SocialLinksProps } from "@/Profiles/types"

export const SocialLinksSection = ({ socialLinks, theme }: SocialLinksProps) => {
	const primary = theme?.primaryColor || "#3B82F6"

	const activeLinks = socialLinks.sort((a, b) => (a.order || 0) - (b.order || 0)) || []

	if (activeLinks.length === 0) return null

	return (
		<section className='grid w-full grid-cols-2 gap-4 md:max-w-xl'>
			{activeLinks.map((link) => {
				const label = link.label

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
								if (icon.tagName === "IMG") {
									;(icon as HTMLImageElement).style.filter = `drop-shadow(0 0 8px ${primary}) opacity(0.9)`
								} else {
									;(icon as HTMLElement).style.filter = `drop-shadow(0 0 8px ${primary})`
								}
							}

							if (text) (text as HTMLElement).style.color = primary
						}}
						onMouseLeave={(e) => {
							const icon = e.currentTarget.querySelector(".social-icon")

							const text = e.currentTarget.querySelector("span")

							if (icon) {
								if (icon.tagName === "IMG") {
									;(icon as HTMLImageElement).style.filter = "none"
								} else {
									;(icon as HTMLElement).style.filter = "none"
								}
							}

							if (text) (text as HTMLElement).style.color = "#4B5563"
						}}>
						<div className='relative flex h-9 w-9 items-center justify-center'>
							{link.image ? (
								<Image
									src={link.image}
									alt={link.label || "social-media"}
									width={36}
									height={36}
									className='social-icon object-contain'
								/>
							) : (
								<div className='social-icon flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700'>
									<span className='text-sm font-semibold'>{label?.charAt(0) || "S"}</span>
								</div>
							)}
						</div>
						<span className='text-[16px] font-medium text-inherit'>{label}</span>
					</a>
				)
			})}
		</section>
	)
}
