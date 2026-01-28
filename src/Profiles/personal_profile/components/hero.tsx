/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
interface PersonalHeroProps {
	businessProfile: {
		businessName?: string | null
		slogan?: string | null
		logoLight?: any
		logoDark?: any
	}
}

export function PersonalHero({ businessProfile }: PersonalHeroProps) {
	return (
		<div className='text-center'>
			<div>
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
