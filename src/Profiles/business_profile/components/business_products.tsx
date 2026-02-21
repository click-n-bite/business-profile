"use client"

import React from "react"
import { cn } from "@/utils/cn"
import Link from "next/link"
import { ImageMedia } from "@/components/payload/image-media"

type Product = {
	id?: string
	title?: string
	description?: string
	url?: string
	url_name?: string
	order?: number
	productImage?: string
}

interface Props {
	products: Product[]
	theme: {
		primaryColor?: string
		secondaryColor?: string
		themeType?: "business" | "personal"
	}
}

const BusinessProductsSection: React.FC<Props> = ({ products, theme }) => {
	const primary = theme?.primaryColor || "#3B82F6"

	const themeType = theme?.themeType || "business"

	const gridCols = themeType === "personal" ? "grid-cols-1" : "grid-cols-1"

	return (
		<div className={cn("mb-4 grid gap-4 md:gap-6", gridCols)}>
			{products
				.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
				.map((product, index) => {
					return (
						<div
							key={product.id || index}
							className={cn(
								"relative flex gap-4 rounded-r-xl border border-slate-200 bg-white p-5 transition-all duration-300 dark:border-white/5 dark:bg-[#0d0d0d]"
							)}>
							<span
								className='absolute top-0 left-0 h-full w-1 rounded-l-xl opacity-70'
								style={{ backgroundColor: primary }}
							/>

							{product.productImage && (
								<div className='relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 dark:border-white/10'>
									<ImageMedia
										resource={product.productImage}
										alt={product.title || "Product image"}
										fill
										className='object-cover'
										sizes='96px'
									/>
									<div
										className='absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-20'
										style={{ backgroundColor: primary }}
									/>
								</div>
							)}

							<div className={cn("flex-1", !product.productImage && "w-full")}>
								<h3 className='text-md font-semibold text-gray-900 dark:text-white'>{product.title}</h3>

								{product.description && <p className='text-muted-foreground mt-1 text-sm'>{product.description}</p>}

								{product.url && (
									<Link
										href={product.url}
										target='_blank'
										rel='noopener noreferrer'
										className='mt-2 inline-block text-xs underline transition-opacity hover:opacity-80'
										style={{ color: primary }}>
										{product.url_name || "Learn more →"}
									</Link>
								)}
							</div>
						</div>
					)
				})}
		</div>
	)
}

export default BusinessProductsSection
