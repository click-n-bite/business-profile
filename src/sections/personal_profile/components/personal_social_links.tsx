"use client"

import { SocialLinksProps } from "@/sections/types"
import { iconMap } from "../../utils"

export function PersonalSocialLinks({ socialLinks, theme }: SocialLinksProps) {
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
						className='group flex items-center justify-between rounded-lg border bg-white p-4 transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900'
						style={{
							borderColor: theme?.primaryColor ? `${theme.primaryColor}20` : undefined,
							backgroundColor: theme?.primaryColor ? `${theme.primaryColor}05` : undefined
						}}>
						<div className='flex items-center gap-4'>
							<div
								className='flex h-10 w-10 items-center justify-center rounded-md'
								style={{
									backgroundColor: theme?.primaryColor ? `${theme.primaryColor}15` : undefined
								}}>
								<Icon className='h-5 w-5' style={{ color: theme?.primaryColor }} />
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
