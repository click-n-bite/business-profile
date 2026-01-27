import { SectionBubbles } from "@/components/common/bubble-design"
import { AboutProps } from "@/sections/types"

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
				{description && <p className='text-[18px] leading-relaxed text-slate-600 dark:text-slate-300'>{description}</p>}
			</div>
		</SectionBubbles>
	)
}
