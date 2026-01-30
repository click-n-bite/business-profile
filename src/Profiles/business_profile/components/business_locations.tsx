"use client"

import { MapPin, ExternalLink } from "lucide-react"

interface LocationCardProps {
	title: string
	address: string
	googleMapLink?: string
	isSelected?: boolean
	onClick?: () => void
	theme?: {
		primaryColor?: string
	}
}

export const LocationCard = ({
	title,
	address,
	googleMapLink,
	isSelected = false,
	onClick,
	theme
}: LocationCardProps) => {
	const primary = theme?.primaryColor

	const content = (
		<div
			onClick={onClick}
			className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[${primary}] ${
				isSelected
					? `border-[${primary}] bg-[${primary}]/10 dark:border-[${primary}] dark:bg-[${primary}]/20`
					: "dark:bg-card/40 border-slate-200 bg-white hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/5 dark:hover:shadow-lg"
			}`}>
			<div className={`rounded-lg bg-[#e9e9e9] p-2.5 text-black dark:bg-[#191919] dark:text-white`}>
				<MapPin className='h-5 w-5' />
			</div>
			<div className='flex-1 text-left'>
				<h3 className='text-[18px] font-semibold text-slate-900 dark:text-white'>{title}</h3>
				<p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>{address}</p>
			</div>
			{googleMapLink && (
				<div className='flex items-center gap-2'>
					<ExternalLink className='h-4 w-4 text-slate-400' />
				</div>
			)}
		</div>
	)

	if (googleMapLink) {
		return (
			<a href={googleMapLink} target='_blank' rel='noopener noreferrer' className='block'>
				{content}
			</a>
		)
	}

	return content
}
