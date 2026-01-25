import { SectionBubbles } from "@/components/common/bubble-design"

interface AboutProps {
	aboutBusiness?: {
		title?: string
		description?: string
	}
	theme?: {
		primaryColor?: string
		secondaryColor?: string
		accentColor?: string
	}
}

export const About = ({ aboutBusiness, theme }: AboutProps) => {
	if (!aboutBusiness) {
		return null
	}

	const { title, description } = aboutBusiness

	if (!title && !description) {
		return null
	}

	return (
		<SectionBubbles theme={theme} className='rounded-xl'>
			<div className='text-center'>
				{title && (
					<h2 className='mb-3 text-[18px] font-semibold tracking-widest text-black uppercase dark:text-gray-300'>
						{title}
					</h2>
				)}

				{description && <p className='text-sm leading-relaxed text-slate-600 dark:text-slate-300'>{description}</p>}
			</div>
		</SectionBubbles>
	)
}
