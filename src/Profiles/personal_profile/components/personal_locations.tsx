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

export const PersonalLocationCard = ({ title, address, googleMapLink }: PersonalLocationCardProps) => {
	const content = (
		<div className='group flex w-full items-center justify-between rounded-lg bg-white p-4 transition-all hover:shadow-md dark:bg-[#1a1a1aa3]'>
			<div className='flex w-full items-center gap-4'>
				<div className='rounded-lg bg-[#191919] p-2.5 text-black dark:text-white'>
					<MapPin className='h-5 w-5' />
				</div>
				<div className='text-left'>
					<h3 className='text-lg font-medium text-gray-900 dark:text-white'>{title}</h3>
					<p className='mt-0.5 text-sm text-gray-600 capitalize dark:text-gray-400'>{address}</p>
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
