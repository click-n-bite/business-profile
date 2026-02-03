import { LandingFooter } from "@/components/landing/landing-footer"
import { LandingHeader } from "@/components/landing/landing-header"

export default function LandingLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='flex min-h-screen flex-col'>
			<LandingHeader />
			{children}
			<LandingFooter />
		</main>
	)
}
