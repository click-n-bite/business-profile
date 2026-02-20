"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Loading from "@/app/(frontend)/[slug]/(main)/loading"

interface TenantContentProps {
	children: React.ReactNode
	defaultLanguage: string
	initialCookieExists: boolean
}

export function TenantContent({ children, defaultLanguage, initialCookieExists }: TenantContentProps) {
	const [isLoading, setIsLoading] = useState(!initialCookieExists)

	const router = useRouter()

	useEffect(() => {
		if (!initialCookieExists) {
			const hasAttempted = sessionStorage.getItem("locale-attempted")

			if (!hasAttempted) {
				sessionStorage.setItem("locale-attempted", "true")
				document.cookie = `locale=${defaultLanguage}; path=/; max-age=31536000; SameSite=Lax`
				router.refresh()
			}
		} else {
			setIsLoading(false)
		}
	}, [defaultLanguage, initialCookieExists, router])

	if (isLoading) {
		return <Loading />
	}

	return <>{children}</>
}
