/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

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

	return (
		<div className='text-center'>
			<style>{`
				.hero-business-name {
					color: ${theme?.lightTitleColor || "#111827"};
				}
				.dark .hero-business-name {
					color: ${theme?.darkTitleColor || "#ffffff"};
				}
			`}</style>

			<div>
				{businessName && <h1 className='hero-business-name my-4 text-4xl font-bold md:text-5xl'>{businessName}</h1>}

				{slogan && <p className='text-xl text-gray-600 dark:text-gray-300'>{slogan}</p>}
			</div>
		</div>
	)
}
