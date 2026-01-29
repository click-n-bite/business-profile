"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { useField } from "@payloadcms/ui"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/utils/cn"
import { Label } from "@/components/ui/label"

// Remove duplicates and organize colors
const BRAND_COLORS = [
	// Primary Brand Colors
	"#3B82F6", // Blue
	"#136c36", // Green
	"#c30811", // Red
	"#FACC15", // Yellow
	"#8B5CF6", // Purple
	"#EC4899", // Pink

	// Grayscale
	"#6B7280", // Gray
	"#F3F4F6", // Light Gray (removed duplicate)

	// Pastels/Light Colors
	"#FCE7F3", // Soft Pink
	"#DBEAFE", // Light Blue
	"#D1FAE5", // Mint Green
	"#E9D5FF", // Lavender
	"#FFEDD5", // Peach
	"#E0F2FE", // Sky Blue
	"#FEF3C7", // Beige
	"#FECDD3", // Rose Quartz
	"#CCFBF1", // Sea Foam

	// Professional/Business Colors
	"#1E40AF", // Corporate Blue
	"#4B5563", // Professional Gray
	"#065F46", // Trust Green
	"#EA580C", // Energy Orange
	"#7C3AED", // Creative Purple
	"#0D9488", // Innovation Teal
	"#B45309", // Luxury Gold
	"#1F2937", // Modern Black
	"#2563EB", // Tech Blue
	"#15803D", // Eco Green

	// Background Colors
	"#FFFFFF", // White
	"#F9FAFB", // Very Light Gray
	"#000000", // Black
	"#111827" // Dark Gray
]

const UNIQUE_BRAND_COLORS = [...new Set(BRAND_COLORS)]

type Props = {
	path: string
	label?: string
	description?: string
	field?: {
		label?: string
		admin?: {
			description?: string
		}
	}
}

const ColorPickerField = ({ path, label, description, field }: Props) => {
	const [open, setOpen] = useState(false)

	const { value, setValue } = useField<string>({ path })

	const displayLabel = label || field?.label || "Color"

	const displayDescription = description || field?.admin?.description

	const currentColor = value || "#3B82F6"

	return (
		<div className='space-y-2'>
			<Label htmlFor={path} className='text-sm font-medium text-gray-700'>
				{displayLabel}
			</Label>

			{displayDescription && <p className='mb-2 text-sm text-gray-500'>{displayDescription}</p>}

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						type='button'
						variant='outline'
						className='flex h-[42px] w-full items-center justify-start gap-3 hover:bg-gray-50'>
						<div className='h-5 w-5 rounded border border-gray-300' style={{ backgroundColor: currentColor }} />
						<span className='font-mono text-sm text-gray-700'>{currentColor}</span>
					</Button>
				</PopoverTrigger>

				<PopoverContent
					side='bottom'
					align='start'
					sideOffset={4}
					className='z-50 w-[300px] space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-lg'>
					<div className='flex items-center gap-3'>
						<input
							type='color'
							value={currentColor}
							onChange={(e) => setValue(e.target.value)}
							className='h-12 w-12 cursor-pointer rounded border border-gray-300'
						/>
						<Input value={currentColor} onChange={(e) => setValue(e.target.value)} className='font-mono text-sm' />
					</div>

					<div>
						<p className='mb-2 text-xs font-medium text-gray-600'>Color Palette</p>
						<div className='grid grid-cols-7 gap-2'>
							{UNIQUE_BRAND_COLORS.map((color) => (
								<button
									key={color}
									type='button'
									onClick={() => {
										setValue(color)
										setOpen(false)
									}}
									className={cn(
										"h-8 w-8 rounded border-2 transition-transform hover:scale-110",
										currentColor === color ? "border-gray-900 ring-2 ring-gray-300" : "border-gray-200"
									)}
									style={{ backgroundColor: color }}
									title={color}
								/>
							))}
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	)
}

export default ColorPickerField
