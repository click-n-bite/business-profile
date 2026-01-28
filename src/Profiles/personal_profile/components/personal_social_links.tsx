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
						className='group flex items-center justify-between rounded-lg bg-white p-4 transition-all hover:shadow-md dark:bg-[#1a1a1aa3]'>
						<div className='flex items-center gap-4'>
							<div className='rounded-lg bg-[#191919] p-2.5 text-black dark:text-white'>
								<Icon className='h-5 w-5' />
							</div>
							<span className='text-lg font-medium text-gray-900 dark:text-white'>{label}</span>
						</div>
						<span className='text-sm text-gray-500 dark:text-gray-400'>↗</span>
					</a>
				)
			})}
		</div>
	)
}
