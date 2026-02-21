"use client"

import React, { useState, useEffect } from "react"
import { useField } from "@payloadcms/ui"
import type { TextFieldClientComponent } from "payload"

const westernToArabic = (str: string): string => {
	const western = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

	const arabic = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]

	return str.replace(/[0-9]/g, (match) => {
		const index = western.indexOf(match)

		return index !== -1 ? arabic[index] : match
	})
}

const countryCodes = [
	{ code: "+961", country: "LB", flag: "🇱🇧", format: "XX XX XX XX" },
	{ code: "+966", country: "SA", flag: "🇸🇦", format: "XX XXX XXXX" },
	{ code: "+971", country: "AE", flag: "🇦🇪", format: "XX XXX XXXX" },
	{ code: "+20", country: "EG", flag: "🇪🇬", format: "XXX XXX XXXX" },
	{ code: "+1", country: "US", flag: "🇺🇸", format: "XXX XXX XXXX" }
]

const PhoneField: TextFieldClientComponent = (props) => {
	const { field, path, readOnly, locale } = props

	const { value, setValue } = useField<any>({ path })

	const [selectedCode, setSelectedCode] = useState("+961")

	const [localNumber, setLocalNumber] = useState("")

	const label = typeof field?.label === "string" ? field.label : field?.label?.en || "Phone Number"

	const required = field?.required || false

	useEffect(() => {
		if (!value) return

		const raw = typeof value === "object" ? value?.[locale as string] || "" : value

		const matched = countryCodes.find((c) => raw.startsWith(c.code))

		if (matched) {
			setSelectedCode(matched.code)
			setLocalNumber(raw.slice(matched.code.length))
		}
	}, [value, locale])

	const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newCode = e.target.value

		setSelectedCode(newCode)

		setValue(newCode + localNumber.replace(/\s/g, ""))
	}

	const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value

		// allow Arabic + Western digits only
		const digitsOnly = input.replace(/[^\d٠-٩]/g, "")

		setLocalNumber(digitsOnly)

		setValue(selectedCode + digitsOnly.replace(/\s/g, ""))
	}

	return (
		<div style={{ marginBottom: "20px" }}>
			<label>
				{label}
				{required && <span>*</span>}
			</label>

			<div style={{ display: "flex", gap: "8px", direction: "ltr" }}>
				<select
					value={selectedCode}
					onChange={handleCodeChange}
					disabled={readOnly}
					style={{
						width: "140px",
						padding: "10px",
						direction: "ltr"
					}}>
					{countryCodes.map((c) => (
						<option key={c.code} value={c.code}>
							{c.flag} {c.code} ({c.country})
						</option>
					))}
				</select>

				<input
					type='text'
					value={localNumber}
					onChange={handleNumberChange}
					disabled={readOnly}
					placeholder={locale === "ar" ? "٠٣ ٠٠ ٠٠ ٠٠" : "03 00 00 00"}
					style={{
						flex: 1,
						padding: "10px",
						fontFamily: "monospace",
						direction: "ltr",
						textAlign: "left",
						unicodeBidi: "embed"
					}}
				/>
			</div>
		</div>
	)
}

export default PhoneField
