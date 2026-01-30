"use client"

import { Textarea } from "@/components/ui/textarea"
import { useField } from "@payloadcms/ui"

const MAX = 50

const LimitTextarea = ({ path }: { path: string }) => {
	const { value = "", setValue } = useField<string>({ path })

	return (
		<div className='space-y-1'>
			<Textarea
				value={value}
				onChange={(e) => {
					const text = e.target.value

					if (text.length <= MAX) {
						setValue(text)
					}
				}}
			/>

			<div className={`text-right text-xs ${value.length === MAX ? "text-red-500" : "text-muted-foreground"}`}>
				{value.length}/{MAX}
			</div>
		</div>
	)
}

export default LimitTextarea
