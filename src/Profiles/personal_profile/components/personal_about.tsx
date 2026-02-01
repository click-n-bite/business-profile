"use client"

import { AboutProps } from "../../types"

export function PersonalAbout({ aboutBusiness }: AboutProps) {
	const { description } = aboutBusiness

	if (!description) return null

	return (
		<div className='px-6'>
			<p className='text-center text-lg leading-relaxed text-gray-600 dark:text-gray-300'>{description}</p>
		</div>
	)
}
