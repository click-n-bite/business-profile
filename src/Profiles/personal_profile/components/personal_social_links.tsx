"use client"

import { SocialLinksProps } from "@/Profiles/types"
import { iconMap } from "../../utils"

export function PersonalSocialLinks({ socialLinks }: SocialLinksProps) {
	const sortedLinks = socialLinks.sort((a, b) => (a.order || 0) - (b.order || 0))

	if (sortedLinks.length === 0) return null

	return (
		<div className='w-full space-y-3'>
			{sortedLinks.map((link) => {
				const Icon = iconMap[link.platform.toLowerCase()]

				const label = link.label || link.platform

				return (
					<a
						key={link.id}
						href={link.url}
						target='_blank'
						rel='noopener noreferrer'
						className='dark:bg-card/40 dark:bg-card/40 relative mb-4 flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-100 bg-white p-4 text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/5 dark:bg-white/5 dark:text-white'>
						<div className='flex items-center gap-4'>
							<div className='rounded-lg bg-[#e9e9e9] p-3 text-black dark:bg-[#191919] dark:text-white'>
								<Icon className='h-5 w-5' />
							</div>
							<span className='text-lg font-medium text-gray-900 dark:text-white'>{label}</span>
						</div>
						<span className='text-lg text-gray-500 dark:text-gray-400'>↗</span>
					</a>
				)
			})}
		</div>
	)
}
