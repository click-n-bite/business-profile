/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function TenantTheme({ theme }: { theme: any }) {
	const { theme: currentTheme } = useTheme()

	useEffect(() => {
		if (!theme) return

		const root = document.documentElement

		const body = document.body

		// Reset styles
		body.style.backgroundImage = ""
		body.style.backgroundColor = ""
		body.style.backgroundSize = ""
		body.style.backgroundPosition = ""
		body.style.backgroundRepeat = ""
		body.style.backgroundAttachment = ""

		// Set color variables
		root.style.setProperty("--primary-color", theme.primaryColor || "#3B82F6")
		root.style.setProperty("--secondary-color", theme.secondaryColor || "#10B981")
		root.style.setProperty("--accent-color", theme.accentColor || "#8B5CF6")

		const isDark = currentTheme === "dark"

		if (isDark) {
			// Dark mode
			if (theme.darkBackground && typeof theme.darkBackground === "object") {
				if (theme.darkBackground.type === "image" && theme.darkBackground.image?.url) {
					root.style.setProperty("--background-color", "transparent")
					body.style.backgroundImage = `url('${theme.darkBackground.image.url}')`
					body.style.backgroundSize = "cover"
					body.style.backgroundPosition = "center"
					body.style.backgroundRepeat = "no-repeat"
					body.style.backgroundAttachment = "fixed"
				} else if (theme.darkBackground.type === "color" && theme.darkBackground.color) {
					root.style.setProperty("--background-color", theme.darkBackground.color)
					body.style.backgroundColor = theme.darkBackground.color
				}
			} else if (theme.darkBackground) {
				root.style.setProperty("--background-color", theme.darkBackground)
				body.style.backgroundColor = theme.darkBackground
			}
		} else {
			// Light mode
			if (theme.lightBackground) {
				if (theme.lightBackground.type === "color" && theme.lightBackground.color) {
					root.style.setProperty("--background-color", theme.lightBackground.color)
					body.style.backgroundColor = theme.lightBackground.color
				} else if (theme.lightBackground.type === "image" && theme.lightBackground.image?.url) {
					root.style.setProperty("--background-color", "transparent")
					body.style.backgroundImage = `url('${theme.lightBackground.image.url}')`
					body.style.backgroundSize = "cover"
					body.style.backgroundPosition = "center"
					body.style.backgroundRepeat = "no-repeat"
					body.style.backgroundAttachment = "fixed"
				}
			}
		}

		// Cleanup
		return () => {
			body.style.backgroundImage = ""
			body.style.backgroundColor = ""
			body.style.backgroundSize = ""
			body.style.backgroundPosition = ""
			body.style.backgroundRepeat = ""
			body.style.backgroundAttachment = ""

			root.style.removeProperty("--primary-color")
			root.style.removeProperty("--secondary-color")
			root.style.removeProperty("--accent-color")
			root.style.removeProperty("--background-color")
		}
	}, [theme, currentTheme])

	return null
}
