"use client"
import { ROUTES } from "@/next.routes"
import Link from "next/link"
import { useParams } from "next/navigation"
import Image from "next/image"

const AppLogo = ({ className }: { className?: string }) => {
	const params = useParams()

	const slug = params.slug as string

	const href = slug ? ROUTES.TENANT_HOME(slug) : ROUTES.HOME

	return (
		<Link href={href} className='block' prefetch={true}>
			<div className={`relative ${className}`}>
				<Image src='/light-logo.png' alt='App Logo' width={185} height={40} className='block dark:hidden' priority />

				<Image src='/dark_logo.png' alt='App Logo' width={185} height={40} className='hidden dark:block' priority />
			</div>
		</Link>
	)
}

export default AppLogo
