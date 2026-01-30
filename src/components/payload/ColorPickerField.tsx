"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { useField } from "@payloadcms/ui"

// Organized color categories
const COLOR_PALETTE = {
	brand: {
		name: "Brand",
		colors: [
			"#3B82F6", // Blue
			"#136c36", // Green
			"#c30811", // Red
			"#FACC15", // Yellow
			"#8B5CF6", // Purple
			"#EC4899" // Pink
		]
	},
	professional: {
		name: "Professional",
		colors: [
			"#1E40AF", // Corporate Blue
			"#065F46", // Trust Green
			"#7C3AED", // Creative Purple
			"#0D9488", // Innovation Teal
			"#B45309", // Luxury Gold
			"#1F2937" // Modern Black
		]
	},
	pastels: {
		name: "Pastels",
		colors: [
			"#FCE7F3", // Soft Pink
			"#DBEAFE", // Light Blue
			"#D1FAE5", // Mint Green
			"#E9D5FF", // Lavender
			"#FFEDD5", // Peach
			"#E0F2FE" // Sky Blue
		]
	},
	neutral: {
		name: "Neutral",
		colors: [
			"#6B7280", // Gray
			"#F3F4F6", // Light Gray
			"#FFFFFF", // White
			"#F9FAFB", // Very Light Gray
			"#000000", // Black
			"#111827", // Dark Gray
			"#4B5563", // Professional Gray
			"#374151" // Medium Gray
		]
	}
}

// Recent colors for quick access
const RECENT_COLORS_KEY = "color-picker-recent-colors"

const MAX_RECENT_COLORS = 12

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

	const [recentColors, setRecentColors] = useState<string[]>(() => {
		if (typeof window === "undefined") return []

		const saved = localStorage.getItem(RECENT_COLORS_KEY)

		return saved ? JSON.parse(saved) : []
	})

	const { value, setValue } = useField<string>({ path })

	const displayLabel = label || field?.label || "Color"

	const displayDescription = description || field?.admin?.description

	const currentColor = value || "#3B82F6"

	const addToRecentColors = (color: string) => {
		const filtered = recentColors.filter((c) => c !== color)

		const updated = [color, ...filtered].slice(0, MAX_RECENT_COLORS)

		setRecentColors(updated)

		if (typeof window !== "undefined") {
			localStorage.setItem(RECENT_COLORS_KEY, JSON.stringify(updated))
		}
	}

	const handleColorSelect = (color: string) => {
		setValue(color)
		addToRecentColors(color)
		setOpen(false)
	}

	const isCustomColor = !Object.values(COLOR_PALETTE)
		.flatMap((cat) => cat.colors)
		.includes(currentColor)

	return (
		<div className='space-y-2'>
			<Label htmlFor={path} className='text-sm font-medium text-gray-700'>
				{displayLabel}
			</Label>

			{displayDescription && <p className='mb-2 text-sm text-gray-500'>{displayDescription}</p>}

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button
						type='button'
						variant='outline'
						className='group flex h-[42px] w-full items-center justify-between gap-3 hover:bg-gray-50'>
						<div className='flex items-center gap-3'>
							<div className='h-5 w-5 rounded border border-gray-300' style={{ backgroundColor: currentColor }} />
							<span className='font-mono text-sm text-gray-700'>{currentColor}</span>
						</div>
						<div className='flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 group-hover:bg-gray-200'>
							<svg className='h-4 w-4 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
							</svg>
						</div>
					</Button>
				</DialogTrigger>

				<DialogContent className='max-h-[80vh] overflow-hidden p-0 sm:max-w-[600px]'>
					{/* <DialogHeader className='px-6 pt-6'> */}
					<DialogTitle className='flex items-center justify-between'>
						<span>Select a color</span>
						<Button variant='ghost' size='sm' className='h-8 w-8 p-0' onClick={() => setOpen(false)}>
							<X className='h-4 w-4' />
						</Button>
					</DialogTitle>
					{/* </DialogHeader> */}

					<div className='space-y-6 px-6 pb-6'>
						<div className='flex items-center justify-between rounded-lg bg-gray-50 p-4'>
							<div className='flex items-center gap-4'>
								<div
									className='h-16 w-16 rounded-lg border-2 border-gray-200 shadow-sm'
									style={{ backgroundColor: currentColor }}
								/>
								<div>
									<p className='text-sm font-medium text-gray-600'>Current Color</p>
									<p className='font-mono text-lg font-semibold'>{currentColor}</p>
									{isCustomColor && <p className='mt-1 text-xs text-gray-500'>Custom color</p>}
								</div>
							</div>
							<div className='flex gap-2'>
								<input
									type='color'
									value={currentColor}
									onChange={(e) => handleColorSelect(e.target.value)}
									className='h-10 w-10 cursor-pointer rounded border border-gray-300'
								/>
							</div>
						</div>

						{/* Color Input */}
						<div className='space-y-2'>
							<Label>Hex Color Code</Label>
							<div className='flex gap-2'>
								<Input
									value={currentColor}
									onChange={(e) => setValue(e.target.value)}
									className='font-mono'
									placeholder='#000000'
								/>
								<Button type='button' onClick={() => handleColorSelect(currentColor)}>
									Apply
								</Button>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default ColorPickerField
