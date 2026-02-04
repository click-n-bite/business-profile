import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import AppLogo from "../common/logo"
import { DevelopedBy } from "../common/developed-by"
import { ROUTES } from "@/next.routes"
import { navLinks } from "@/data/landing"
import { useTranslations } from "next-intl"

export const LandingFooter = () => {
	const t = useTranslations("landing.application")

	return (
		<footer className='border-border/60 relative border-t bg-white dark:bg-[#0f1324]'>
			<div className='bg-grid-gray-100/50 dark:bg-grid-gray-800/50 absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]' />

			<div className='custom-container relative space-y-8 py-10'>
				<div className='mb-6 flex flex-col items-center space-y-2 text-center'>
					<AppLogo />

					<p className='max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-400'>
						{t("footer.logoDescription")}
					</p>

					<div className='flex flex-col items-center gap-4 pt-2 sm:flex-row'>
						<Button asChild variant='gradient'>
							<Link href={ROUTES.CONTACT} target='_blank' rel='noopener noreferrer'>
								<MessageCircle className='mr-1 size-4' />
								{t("actions.contact")}
							</Link>
						</Button>

						<Button asChild variant='outline'>
							<Link href={ROUTES.DEMO}>{t("actions.demo")}</Link>
						</Button>
					</div>
				</div>

				<nav className='mb-6 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm'>
					{navLinks.map(({ label, href }) => (
						<Link
							key={label}
							href={href}
							className='text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'>
							{t(label)}
						</Link>
					))}
				</nav>

				<DevelopedBy className='border-border/50 border-t pt-5 text-center' />
			</div>
		</footer>
	)
}
