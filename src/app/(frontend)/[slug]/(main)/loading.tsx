import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
	return (
		<div className='flex flex-col items-center justify-center px-6 pb-10 md:rounded-2xl'>
			<div className='flex w-full flex-col items-center justify-center gap-10 md:max-w-3xl md:rounded-2xl'>
				<div className='flex w-full items-center justify-center overflow-hidden rounded-2xl'>
					<Skeleton className='h-40 w-40 rounded-full' />
				</div>

				<div className='w-full space-y-4 md:max-w-xl'>
					<Skeleton className='h-8 w-32' />
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-3/4' />
					<Skeleton className='h-4 w-2/3' />
				</div>

				<div className='w-full space-y-4 md:max-w-xl'>
					<Skeleton className='h-8 w-24' />
					<div className='flex gap-2 overflow-hidden'>
						<Skeleton className='h-48 w-full rounded-lg' />
						<Skeleton className='h-48 w-full rounded-lg' />
						<Skeleton className='h-48 w-full rounded-lg' />
					</div>
				</div>

				<div className='w-full space-y-4 md:max-w-xl'>
					<Skeleton className='h-8 w-36' />
					<div className='space-y-3'>
						{[1, 2, 3].map((i) => (
							<Skeleton key={i} className='h-20 w-full rounded-lg' />
						))}
					</div>
				</div>

				<div className='w-full space-y-4 md:max-w-xl'>
					<Skeleton className='h-8 w-28' />
					<div className='flex gap-3'>
						{[1, 2, 3, 4].map((i) => (
							<Skeleton key={i} className='h-12 w-12 rounded-full' />
						))}
					</div>
				</div>

				<div className='w-full space-y-4 md:max-w-xl'>
					<Skeleton className='h-8 w-40' />
					<div className='flex gap-3 overflow-hidden'>
						{[1, 2, 3, 4].map((i) => (
							<Skeleton key={i} className='h-32 w-32 rounded-lg' />
						))}
					</div>
				</div>

				<section className='grid w-full grid-cols-1 gap-4 pb-6 md:max-w-xl'>
					<Skeleton className='h-8 w-40' />
					<div className='space-y-3'>
						{[1, 2].map((i) => (
							<Skeleton key={i} className='h-32 w-full rounded-lg' />
						))}
					</div>
				</section>
			</div>
		</div>
	)
}
