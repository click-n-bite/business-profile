/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { ImageMedia } from "@/components/payload/image-media"

interface PersonalHeroProps {
	businessProfile: {
		businessName?: string | null
		slogan?: string | null
		logoLight?: any
		logoDark?: any
	}
}

export function PersonalHero({ businessProfile }: PersonalHeroProps) {
	// const getLogoUrl = (logo: any) => {
	// 	if (!logo) return null

	// 	if (typeof logo === "string") return logo

	// 	if (logo.url) return logo.url

	// 	return null
	// }

	// const logoUrl = getLogoUrl(businessProfile.logoLight) || getLogoUrl(businessProfile.logoDark)

	return (
		<div className='text-center'>
			<div>
				{/* {logoUrl && (
					<div className='aspect-[6/4] h-full w-full overflow-hidden rounded-lg'>
						<ImageMedia
							resource={businessProfile.logoLight}
							alt={businessProfile.businessName || "Business images"}
							className='h-full w-full object-cover'
						/>
					</div>
				)} */}

				{businessProfile.businessName && (
					<h1 className='my-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white'>
						{businessProfile.businessName}
					</h1>
				)}

				{businessProfile.slogan && <p className='text-xl text-gray-600 dark:text-gray-300'>{businessProfile.slogan}</p>}
			</div>
		</div>
	)
}
