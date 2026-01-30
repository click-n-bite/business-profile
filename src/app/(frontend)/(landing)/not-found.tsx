import { ArrowLeft, Home, LifeBuoy } from "lucide-react"
import Link from "next/link"
import { MotionDiv } from "@/components/motion/motion-div"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/next.routes"
import { BlobsBackground } from "@/components/landing/blobs-background"

export default function NotFound() {
	return (
		<div className='relative flex min-h-screen items-center overflow-hidden'>
			<BlobsBackground />

			<div className='relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-2'>
				{/* Left: 404 */}
				<MotionDiv
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6 }}
					className='flex flex-col items-center justify-center text-center md:items-start md:text-left'>
					<span className='mb-4 text-sm font-semibold tracking-widest text-purple-600 uppercase dark:text-purple-400'>
						Error
					</span>

					<h1 className='relative text-[9rem] leading-none font-black'>
						<span className='absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-30 blur-3xl' />
						<span className='relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
							404
						</span>
					</h1>
				</MotionDiv>

				{/* Right: Content */}
				<MotionDiv
					initial={{ opacity: 0, x: 30 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='flex flex-col justify-center'>
					<h2 className='mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100'>This page took a wrong turn</h2>

					<p className='mb-8 max-w-md text-lg text-gray-600 dark:text-gray-300'>
						The page you’re trying to reach doesn’t exist anymore or was moved. No worries — let’s get you back
						somewhere useful.
					</p>

					<div className='flex flex-wrap gap-4'>
						<Button asChild size='lg' variant='gradient'>
							<Link href={ROUTES.HOME}>
								<Home className='me-2 size-5' />
								Back to Home
							</Link>
						</Button>

						<Button asChild size='lg' variant='outline'>
							<Link href={ROUTES.CONTACT}>
								<LifeBuoy className='me-2 size-5' />
								Get Help
							</Link>
						</Button>
					</div>

					<Link
						href={ROUTES.HOME}
						className='mt-10 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'>
						<ArrowLeft className='size-4' />
						Return safely
					</Link>
				</MotionDiv>
			</div>
		</div>
	)
}
