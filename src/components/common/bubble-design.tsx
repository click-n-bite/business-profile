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

export const SectionBubbles: React.FC<ProfileCardProps> = ({ children, className = "" }) => {
	return (
		<div
			className={`relative w-full overflow-hidden border border-gray-200 bg-white/90 p-6 md:max-w-xl md:rounded-xl md:shadow-lg md:backdrop-blur-md dark:border-white/10 dark:bg-black/40 ${className}`}>
			<div className='relative z-10 flex w-full flex-col items-center justify-center'>{children}</div>
		</div>
	)
}
