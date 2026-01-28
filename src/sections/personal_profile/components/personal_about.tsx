/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { AboutProps } from "../../types"

export function PersonalAbout({ aboutBusiness, theme }: AboutProps) {
	const { description } = aboutBusiness

	if (!description) return null

	return (
		<div
			className='px-6'
			style={{
				// borderColor: theme?.primaryColor ? `${theme.primaryColor}20` : undefined
				// backgroundColor: theme?.primaryColor ? `#3434354a` : undefined
			}}>
			<p className='text-lg leading-relaxed text-gray-600 dark:text-gray-300'>{description}</p>
		</div>
	)
}
