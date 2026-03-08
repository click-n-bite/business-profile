/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ImageMedia } from "@/components/payload/image-media"

interface PersonalHeroProps {
	businessProfile: {
		businessName?: string | null
		slogan?: string | null
		logoLight?: any
		logoDark?: any
	}
	theme?: {
		lightTitleColor?: string
		darkTitleColor?: string
	}
}

export function PersonalHero({ businessProfile, theme }: PersonalHeroProps) {
	const businessName = businessProfile.businessName ?? null

	const slogan = businessProfile.slogan ?? null

	const hasLogoLight = businessProfile.logoLight && typeof businessProfile.logoLight !== "string"

	const hasLogoDark = businessProfile.logoDark && typeof businessProfile.logoDark !== "string"

	return (
		<div className='flex flex-col items-center justify-center gap-4 pb-6 text-center'>
			<style>{`
				.hero-business-name {
					color: ${theme?.lightTitleColor || "#111827"};
				}
				.dark .hero-business-name {
					color: ${theme?.darkTitleColor || "#ffffff"};
				}
			`}</style>

			{businessName && <h1 className='hero-business-name text-3xl font-bold md:text-5xl'>{businessName}</h1>}
			{slogan && <p className='text-sm text-gray-600 md:text-xl dark:text-gray-300'>{slogan}</p>}

			{(hasLogoLight || hasLogoDark) && (
				<div className='relative h-42 w-42'>
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

		</div>
	)
}
