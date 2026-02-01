interface SectionTitleProps {
	title: string
}

export const SectionTitle = ({ title }: SectionTitleProps) => {
	return (
		<div className='my-6 flex w-full items-center gap-4'>
			<div className='h-px flex-1 bg-slate-200 dark:bg-white/10' />

			<h2 className='text-xl font-semibold tracking-widest whitespace-nowrap text-slate-700 uppercase dark:text-slate-300'>
				{title}
			</h2>

			<div className='h-px flex-1 bg-slate-200 dark:bg-white/10' />
		</div>
	)
}
