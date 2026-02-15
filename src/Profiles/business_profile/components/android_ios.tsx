"use client"

import React from "react"
import Image from "next/image"

interface AppLinks {
	androidLink?: string
	iosLink?: string
}

interface DownloadProps {
	appLinks?: AppLinks
}

export const Download = ({ appLinks }: DownloadProps) => {
	const androidLink = appLinks?.androidLink

	const iosLink = appLinks?.iosLink

	const hasAnyLink = androidLink || iosLink

	if (!hasAnyLink) {
		return null
	}

	return (
		<section>
			<div className='container mx-auto px-4'>
				<div className='flex items-center justify-center gap-4'>
					{androidLink && (
						<a
							href={androidLink}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-block transition-transform hover:scale-105'>
							<div className='relative h-20 w-48'>
								<Image
									src='/apps/google.png'
									alt='Get it on Google Play'
									fill
									sizes='(max-width: 640px) 144px, 192px'
									className='object-contain'
								/>
							</div>
						</a>
					)}

					{iosLink && (
						<a
							href={iosLink}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-block transition-transform hover:scale-105'>
							<div className='relative h-20 w-48'>
								<Image
									src='/apps/app-store.png'
									alt='Download on the App Store'
									fill
									sizes='(max-width: 640px) 144px, 192px'
									className='object-contain'
								/>
							</div>
						</a>
					)}
				</div>
			</div>
		</section>
	)
}
