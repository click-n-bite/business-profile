"use client"

import React from "react"
import { cn } from "@/utils/cn"
import Link from "next/link"

type Service = {
	id?: string
	title?: string
	description?: string
	url?: string
}

interface Props {
	services: Service[]
	theme: {
		primaryColor?: string
		secondaryColor?: string
		themeType?: "business" | "personal"
	}
}

const BusinessServicesSection: React.FC<Props> = ({ services, theme }) => {
	const primary = theme?.primaryColor || "#3B82F6"

	const themeType = theme?.themeType || "business"

	const gridCols = themeType === "personal" ? "grid-cols-1" : "grid-cols-1"

	return (
		<div className={cn("mb-4 grid gap-4 md:gap-6", gridCols)}>
			{services.map((service, index) => (
				<div
					key={service.id || index}
					className={cn(
						"relative rounded-r-xl border border-slate-200 bg-white p-5 transition-all duration-300 dark:border-white/5 dark:bg-[#0d0d0d]"
					)}>
					<span
						className='absolute top-0 left-0 h-full w-1 rounded-l-xl opacity-70'
						style={{ backgroundColor: primary }}
					/>

					<div className='flex gap-4'>
						<div>
							<h3 className='text-md font-semibold text-gray-900 dark:text-white'>{service.title}</h3>

							{service.description && <p className='text-muted-foreground mt-1 text-sm'>{service.description}</p>}
							{service.url && (
								<Link
									href={service.url}
									target='_blank'
									rel='noopener noreferrer'
									className='underline transition-opacity hover:opacity-80'
									style={{ color: primary }}>
									{service.url}
								</Link>
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default BusinessServicesSection
