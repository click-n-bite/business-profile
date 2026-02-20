"use client"

import React from "react"
import Image from "next/image"

interface AppLink {
	androidLink?: string
	iosLink?: string
}

interface DownloadProps {
	appLinks?: AppLink[]
}

export const Download = ({ appLinks }: DownloadProps) => {
	if (!appLinks || appLinks.length === 0) {
		return null
	}

	return (
		<section>
			<div className='container mx-auto px-4'>
				<div className='flex flex-col gap-2'>
					{appLinks.map((link, index) => (
						<div key={index} className='flex items-center justify-center gap-4'>
							{link.androidLink && (
								<a
									href={link.androidLink}
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

							{link.iosLink && (
								<a
									href={link.iosLink}
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
					))}
				</div>
			</div>
		</section>
	)
}
