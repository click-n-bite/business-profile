import { getRequestConfig } from "next-intl/server"
import { cookies } from "next/headers"

export default getRequestConfig(async () => {
	const store = await cookies()

	const locale = store.get("locale")?.value || "en"

	try {
		return {
			locale,
			messages: (await import(`../../messages/${locale}.json`)).default
		}
	} catch (error) {
		console.error(`Could not load messages for locale: ${locale}`, error)

		return {
			locale: "en",
			messages: (await import(`../../messages/en.json`)).default
		}
	}
})
