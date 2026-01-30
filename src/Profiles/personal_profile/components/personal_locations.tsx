"use client"

import { MapPin } from "lucide-react"

interface PersonalLocationCardProps {
	title: string
	address: string
	googleMapLink?: string
}

export const PersonalLocationCard = ({ title, address, googleMapLink }: PersonalLocationCardProps) => {
	const content = (
		<div className='dark:bg-card/40 dark:bg-card/40 relative mb-4 flex w-full cursor-pointer justify-between rounded-xl border border-slate-200 bg-slate-100 bg-white p-4 text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/5 dark:bg-white/5 dark:text-white'>
			<div className='flex w-full items-center gap-4'>
				<div className='rounded-lg bg-[#e9e9e9] p-3 text-black dark:bg-[#191919] dark:text-white'>
					<MapPin className='h-5 w-5' />
				</div>
				<div>
					<h3 className='text-start text-lg font-medium text-gray-900 dark:text-white'>{title}</h3>
					<p className='mt-0.5 text-sm text-gray-600 capitalize dark:text-gray-400'>{address}</p>
				</div>
			</div>
			{googleMapLink && <span className='text-lg text-gray-500 dark:text-gray-400'>↗</span>}
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
