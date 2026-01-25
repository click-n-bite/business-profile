"use client"

interface ProfileCardProps {
	theme?: {
		primaryColor?: string
		secondaryColor?: string
		accentColor?: string
	}
	className?: string
	children?: React.ReactNode
}

export const SectionBubbles: React.FC<ProfileCardProps> = ({ theme, children, className = "" }) => {
	const primaryColor = theme?.primaryColor || "#bab9b9"

	const secondaryColor = theme?.secondaryColor || primaryColor

	const accentColor = theme?.accentColor || primaryColor

	return (
		<div
			className={`relative w-full overflow-hidden border border-gray-200 bg-white/90 p-6 md:max-w-xl md:rounded-xl md:shadow-lg md:backdrop-blur-md dark:border-white/10 dark:bg-black/40 ${className}`}>
			<div
				className='absolute -top-8 -left-8 h-28 w-28 rounded-full opacity-25 blur-2xl'
				style={{ background: primaryColor }}
			/>
			<div
				className='absolute -top-6 -right-10 h-24 w-24 rounded-full opacity-20 blur-2xl'
				style={{ background: secondaryColor }}
			/>
			<div
				className='animate-pulse-slow absolute -right-6 -bottom-10 h-32 w-32 rounded-full opacity-15 blur-3xl'
				style={{ background: accentColor }}
			/>
			<div
				className='animate-pulse-slow absolute -bottom-10 -left-6 h-32 w-32 rounded-full opacity-15 blur-3xl'
				style={{ background: accentColor }}
			/>

			<div className='relative z-10 w-full'>{children}</div>
		</div>
	)
}
