"use client"

//#region Import
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import AppLogo from "../common/logo"
import { LanguageSwitcher } from "../common/language-switcher"
import { ThemeSwitcher } from "../common/theme-switcher"
import { navLinks } from "@/data/landing"
import { ROUTES } from "@/next.routes"
import { cn } from "@/utils/cn"
import { useTranslations } from "next-intl"
//#endregion

export function LandingHeader() {
	const t = useTranslations("landing.application")

	const pathname = usePathname()

	const isHome = pathname === "/"

	return (
		<header
			className={cn(
				"sticky top-0 z-50 bg-white shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/80 dark:bg-[#0f1324]",
				isHome ? "h-20" : "h-16"
			)}>
			<div className='custom-container flex h-full items-center justify-between'>
				<AppLogo />

				<div className='hidden items-center gap-4 md:flex lg:gap-6'>
					<div className='flex items-center gap-4 lg:gap-6'>
						{navLinks.map((link) => (
							<Link key={link.href} href={link.href} className='border-animate'>
								{t(link.label)}
							</Link>
						))}
					</div>

					<div className='flex items-center gap-2'>
						<ThemeSwitcher />
						<LanguageSwitcher />
					</div>
					<div className='flex items-center gap-2.5'>
						<Button asChild variant='outline'>
							<Link href={ROUTES.CONTACT} target='_blank' rel='noopener noreferrer'>
								{t("actions.contact")}
							</Link>
						</Button>
						<Button asChild variant='gradient'>
							<Link href={ROUTES.DEMO}>{t("actions.demo")}</Link>
						</Button>
					</div>
				</div>

				<div className='flex items-center gap-2 md:hidden'>
					<ThemeSwitcher />
					<LanguageSwitcher />
				</div>
			</div>
		</header>
	)
}
