import { SectionBubbles } from "@/components/common/bubble-design"
import { AboutProps } from "@/Profiles/types"

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
				{description && (
					<p className='text-sm leading-relaxed text-slate-600 md:text-xl dark:text-slate-300'>{description}</p>
				)}
			</div>
		</SectionBubbles>
	)
}
