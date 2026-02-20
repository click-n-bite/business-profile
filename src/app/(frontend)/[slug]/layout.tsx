// app/[slug]/layout.tsx
import { TenantFooter } from "@/components/tenant/tenant-footer"
import { TenantHeader } from "@/components/tenant/tenant-header"
import { TenantTheme } from "@/components/tenant/tenant-theme"
import { fetchTenantData } from "@/Profiles/service"
import { LazyMotion } from "@/lib/motion/lazy-motion"
import { DirectionProvider } from "@/providers/direction-provider"
import { getLangDir } from "rtl-detect"
import { ThemeProvider } from "@/providers/theme-provider"
import { ReactQueryProvider } from "@/lib/react-query/provider"
import { Toaster } from "@/components/ui/sonner"
import { NextIntlClientProvider } from "next-intl"
import { cookies } from "next/headers"
import { POPPINS, KALAM } from "@/next.fonts"
import { TenantContent } from "@/components/tenant/tenant-content"
import "@/styles/globals.css"

interface TenantLayoutProps {
	children: React.ReactNode
	params: Promise<{
		slug: string
	}>
}

export default async function TenantLayout({ children, params }: TenantLayoutProps) {
	const { slug } = await params

	const data = await fetchTenantData(slug)

	const theme = data.businessThemes

	const defaultLanguage = data.DefaultLanguage?.[0]?.language || "en"

	const cookieStore = await cookies()

	const locale = cookieStore.get("locale")?.value || defaultLanguage

	const dir = getLangDir(locale)

	// Check if cookie exists on server
	const cookieExists = !!cookieStore.get("locale")

	return (
		<html
			lang={locale}
			dir={dir}
			suppressHydrationWarning
			className={`${POPPINS.variable} ${KALAM.variable} antialiased`}>
			<head>
				<meta name='apple-mobile-web-app-title' content='SmartDigitalId' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover'
				/>
			</head>
			<body suppressHydrationWarning>
				<NextIntlClientProvider>
					<DirectionProvider dir={dir}>
						<ThemeProvider>
							<LazyMotion>
								<ReactQueryProvider>
									<TenantTheme theme={theme} />
									<main className='relative flex min-h-screen flex-col'>
										<TenantHeader defaultLanguage={defaultLanguage} />
										<div className='flex-1 pt-[68px] md:pt-[100px]'>
											<TenantContent defaultLanguage={defaultLanguage} initialCookieExists={cookieExists}>
												{children}
											</TenantContent>
										</div>
										<TenantFooter />
									</main>
								</ReactQueryProvider>
							</LazyMotion>
							<Toaster />
						</ThemeProvider>
					</DirectionProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
