// import { cookies } from "next/headers"
// import { defaultLocale, locales } from "."
// import { NextRequest } from "next/server"

// export async function getServerLocale(): Promise<"en" | "ar"> {
// 	const cookieStore = await cookies()

// 	const locale = cookieStore.get("locale")?.value

// 	return (locales.some(({ code }) => code === locale) ? locale! : defaultLocale) as "en" | "ar"
// }

// export function getLocaleFromRequest(req: NextRequest): string {
// 	const cookie = req.cookies.get("locale")?.value

// 	return locales.map(({ code }) => code).includes(cookie as string) ? cookie! : defaultLocale
// }
import { cookies } from "next/headers"
import { defaultLocale, locales } from "."

export async function getServerLocale(): Promise<"en" | "ar"> {
	const cookieStore = await cookies()

	const locale = cookieStore.get("locale")?.value

	return (locales.some(({ code }) => code === locale) ? locale! : defaultLocale) as "en" | "ar"
}
