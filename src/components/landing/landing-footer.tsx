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
		<footer className='border-border/60 relative border-t bg-white pt-16 pb-8 dark:bg-[#0f1324]'>
			<div className='bg-grid-gray-100/50 dark:bg-grid-gray-800/50 absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]' />

			<div className='custom-container relative space-y-12'>
				<div className='grid gap-12 lg:grid-cols-12'>
					<div className='space-y-2 lg:col-span-5'>
						<AppLogo />
						<p className='mt-5 max-w-md text-sm text-slate-600 sm:text-base dark:text-slate-400'>
							{t("footer.logoDescription")}
						</p>

						<div className='!mt-8 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row md:mx-auto'>
							<Button asChild variant='gradient' className='w-full sm:w-auto'>
								<Link href={ROUTES.CONTACT} target='_blank' rel='noopener noreferrer'>
									<MessageCircle className='size-4' />
									{t("actions.contact")}
								</Link>
							</Button>

							<Button
								asChild
								variant='outline'
								className='w-full border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 sm:w-auto dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-900/20'>
								<Link href={ROUTES.DEMO}>{t("actions.demo")}</Link>
							</Button>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-8 lg:col-span-4 lg:col-start-8'>
						<div className='space-y-4'>
							<h4 className='text-lg font-semibold text-slate-900 dark:text-white'>{t("footer.columns.product")}</h4>
							<nav className='flex flex-col gap-3'>
								{navLinks.map(({ label, href }) => (
									<Link href={href} key={label} className='text-slate-600 transition-colors dark:text-slate-400'>
										{t(label)}
									</Link>
								))}
							</nav>
						</div>

						{/* <div className='space-y-4'>
							<h4 className='text-lg font-semibold text-slate-900 dark:text-white'>{t("footer.columns.legal")}</h4>
							<nav className='flex flex-col gap-3'>
								{legalLinks.map(({ label, href }) => (
									<Link
										href={href}
										key={label}
										className='text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'>
										{t(label)}
									</Link>
								))}
							</nav>
						</div> */}
					</div>
				</div>

				<DevelopedBy className='border-border/50 border-t pt-8' />
			</div>
		</footer>
	)
}
