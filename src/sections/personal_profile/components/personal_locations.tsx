"use client"

import { MapPin } from "lucide-react"

interface PersonalLocationCardProps {
	title: string
	address: string
	googleMapLink?: string
	theme?: {
		primaryColor?: string
	}
}

export const PersonalLocationCard = ({ title, address, googleMapLink, theme }: PersonalLocationCardProps) => {
	const primary = theme?.primaryColor

	const content = (
		<div
			className='group flex items-center w-full justify-between rounded-lg border bg-white p-4 transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900'
			style={{
				borderColor: primary ? `${primary}20` : undefined,
				backgroundColor: primary ? `${primary}05` : undefined
			}}>
			<div className='flex items-center gap-4 w-full'>
				<div
					className='flex h-10 w-10 items-center justify-center rounded-md'
					style={{
						backgroundColor: primary ? `${primary}15` : undefined
					}}>
					<MapPin className='h-5 w-5' style={{ color: primary }} />
				</div>
				<div className='text-left'>
					<h3 className='text-lg font-medium text-gray-900 dark:text-white'>{title}</h3>
					<p className='mt-0.5 text-sm text-gray-600 dark:text-gray-400'>{address}</p>
				</div>
			</div>
			{googleMapLink && <span className='text-sm text-gray-500 dark:text-gray-400'>↗</span>}
		</div>
	)

	if (googleMapLink) {
		return (
			<a href={googleMapLink} target='_blank' rel='noopener noreferrer' className='block w-full'>
				{content}
			</a>
		)
	}

	return content
}
