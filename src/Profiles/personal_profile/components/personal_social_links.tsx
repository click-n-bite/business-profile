/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import Image from "next/image"
import { SocialLinksProps } from "@/Profiles/types"

export function PersonalSocialLinks({ socialLinks, theme }: SocialLinksProps) {
	const sortedLinks = socialLinks.sort((a, b) => (a.order || 0) - (b.order || 0))

	const [hoveredLink, setHoveredLink] = useState<string | null>(null)

	const primary = theme?.primaryColor || "#3B82F6"

	if (sortedLinks.length === 0) return null

	const getImageUrl = (image: any): string => {
		if (typeof image === "string") {
			return image
		}

		if (image?.url) {
			return image.url
		}

		return ""
	}

	const getImageAlt = (image: any, label: string): string => {
		if (typeof image === "string") {
			return label || "social link"
		}

		if (image?.alt) {
			return image.alt
		}

		return label || "social link"
	}

	return (
		<div className='w-full space-y-3'>
			{sortedLinks.map((link) => {
				const label = link.label || ""

				const isHovered = hoveredLink === link.id

				const imageUrl = getImageUrl(link.image)

				const imageAlt = getImageAlt(link.image, label)

				return (
					<a
						key={link.id}
						href={link.url}
						target='_blank'
						rel='noopener noreferrer'
						className='dark:bg-card/40 relative mb-4 flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-white p-4 text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/5 dark:bg-white/5 dark:text-white'
						onMouseEnter={() => setHoveredLink(link.id)}
						onMouseLeave={() => setHoveredLink(null)}
						style={{
							borderColor: isHovered ? `${primary}40` : undefined,
							boxShadow: isHovered ? `0 10px 40px -10px ${primary}30` : undefined
						}}>
						<div className='flex items-center gap-4'>
							<div
								className='rounded-lg bg-[#e9e9e9] p-3 text-black transition-all duration-300 dark:bg-[#191919] dark:text-white'
								style={{
									backgroundColor: isHovered ? `${primary}15` : undefined
								}}>
								{imageUrl ? (
									<Image
										src={imageUrl}
										alt={imageAlt}
										width={20}
										height={20}
										className='h-5 w-5 object-contain transition-all duration-300'
										style={{
											filter: isHovered ? `drop-shadow(0 0 6px ${primary})` : undefined,
											transform: isHovered ? "scale(1.1)" : undefined
										}}
									/>
								) : (
									<div className='flex h-5 w-5 items-center justify-center'>
										<span
											className='text-xs font-semibold transition-colors duration-300'
											style={{ color: isHovered ? primary : undefined }}>
											{label?.charAt(0) || "S"}
										</span>
									</div>
								)}
							</div>
							<span
								className='text-lg font-medium text-gray-900 transition-colors duration-300 dark:text-white'
								style={{ color: isHovered ? primary : undefined }}>
								{label}
							</span>
						</div>
						<span
							className='text-lg transition-all duration-300'
							style={{
								color: isHovered ? primary : undefined,
								transform: isHovered ? "translateX(4px) translateY(-4px)" : undefined
							}}>
							↗
						</span>
					</a>
				)
			})}
		</div>
	)
}
