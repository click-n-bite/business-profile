"use client"

import { BusinessProfile } from "@payload-types"
import { ImageMedia } from "@/components/payload/image-media"

interface HeroProps {
	businessProfile?: BusinessProfile | null
	theme?: {
		primaryColor?: string
		secondaryColor?: string
	}
}

export const Hero = ({ businessProfile, theme }: HeroProps) => {
	if (!businessProfile) return null

	const businessName = businessProfile.businessName ?? null

	const slogan = businessProfile.slogan ?? null

	const hasLogoLight = businessProfile.logoLight && typeof businessProfile.logoLight !== "string"

	const hasLogoDark = businessProfile.logoDark && typeof businessProfile.logoDark !== "string"

	return (
		<div className='relative z-10 flex w-full flex-col items-center gap-2 px-6 text-center md:max-w-5xl'>
			{(hasLogoLight || hasLogoDark) && (
				<div className='relative h-62 w-62'>
					{hasLogoLight && (
						<div className='relative h-full w-full dark:hidden'>
							<ImageMedia
								resource={businessProfile.logoLight}
								alt={businessName || "Business Logo"}
								className='rounded-full object-cover'
								fill
							/>
						</div>
					)}

					{hasLogoDark && (
						<div className='relative hidden h-full w-full dark:block'>
							<ImageMedia
								resource={businessProfile.logoDark}
								alt={businessName || "Business Logo Dark"}
								className='rounded-full object-cover'
								fill
							/>
						</div>
					)}

					{!hasLogoLight && !hasLogoDark && (
						<div className='flex h-full w-full items-center justify-center'>
							<div className='text-3xl font-bold text-slate-400'>{businessName?.charAt(0)}</div>
						</div>
					)}
				</div>
			)}

			{businessName && (
				<h1 className='font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white'>
					{businessName}
				</h1>
			)}

			{slogan && <p className='max-w-2xl text-lg text-slate-600 md:text-xl dark:text-slate-300'>{slogan}</p>}
		</div>
	)
}
