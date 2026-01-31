"use client"

import React from "react"
import { cn } from "@/utils/cn"

type Service = {
	id?: string
	title?: string
	description?: string
}

interface Props {
	services: Service[]
	theme: {
		primaryColor?: string
		secondaryColor?: string
		themeType?: "business" | "personal"
	}
}

const BusinessServicesSection: React.FC<Props> = ({ services, theme }) => {
	const primary = theme?.primaryColor || "#3B82F6"

	const themeType = theme?.themeType || "business"

	const getGridCols = () => {
		switch (themeType) {
			case "personal":
				return "grid-cols-1"
			case "business":
			default:
				return "grid-cols-1 sm:grid-cols-2"
		}
	}

	const getCardStyle = () => {
		switch (themeType) {
			case "personal":
				return "max-w-md mx-auto w-full text-center hover:shadow-lg"
			case "business":
			default:
				return "hover:bg-gray-50 dark:hover:bg-gray-800"
		}
	}

	return (
		<div className={cn("grid gap-4 md:gap-6", getGridCols())}>
			{services.map((service, index) => (
				<div
					key={service.id || index}
					className={cn(
						"group relative rounded-xl border p-5 transition-all duration-300",
						"dark:bg-card/40 bg-white",
						"border-gray-200 dark:border-gray-800",
						getCardStyle()
					)}>
					<div
						className={cn(
							"mb-4 flex items-center gap-4",
							themeType === "personal" && "flex-col justify-center text-center"
						)}>
						<div
							className={cn(
								"flex items-center justify-center rounded-full font-bold text-white transition-all",
								themeType === "personal" && "h-14 w-14 text-xl",
								themeType === "business" && "h-10 w-10 text-lg"
							)}
							style={{
								backgroundColor: primary || "#3b82f6"
							}}>
							{index + 1}
						</div>

						<h3
							className={cn(
								"flex-1 font-semibold text-gray-900 dark:text-white",
								themeType === "personal" && "text-xl"
							)}>
							{service.title}
						</h3>
					</div>

					{service.description && (
						<p
							className={cn(
								"text-muted-foreground",
								themeType === "personal" && "text-center text-base",
								themeType === "business" && "text-sm"
							)}>
							{service.description}
						</p>
					)}
				</div>
			))}
		</div>
	)
}

export default BusinessServicesSection
