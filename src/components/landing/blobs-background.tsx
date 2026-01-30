export const BlobsBackground = () => (
	<>
		<div className='absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-emerald-50 rtl:bg-gradient-to-bl dark:from-yellow-900/10 dark:via-yellow-900/10 dark:to-emerald-900/10' />
		<div className='animate-blob absolute start-0 top-0 size-72 rounded-full bg-[#06bd7a] opacity-20 mix-blend-multiply blur-xl dark:bg-yellow-500' />
		<div className='animate-blob animation-delay-2000 absolute end-0 top-0 size-72 rounded-full bg-emerald-400 opacity-20 mix-blend-multiply blur-xl dark:bg-emerald-500' />
		<div className='animate-blob animation-delay-4000 absolute start-20 -bottom-8 size-72 rounded-full bg-amber-400 opacity-20 mix-blend-multiply blur-xl dark:bg-amber-500' />
	</>
)
