/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from "react"
import { useField, useLocale } from "@payloadcms/ui"
import type { TextFieldClientComponent } from "payload"

const countryCodes = [
	{ code: "+961", country: "LB", flag: "🇱🇧", format: "XX XX XX XX" },
	{ code: "+966", country: "SA", flag: "🇸🇦", format: "XX XXX XXXX" },
	{ code: "+971", country: "AE", flag: "🇦🇪", format: "XX XXX XXXX" },
	{ code: "+20", country: "EG", flag: "🇪🇬", format: "XXX XXX XXXX" },
	{ code: "+1", country: "US", flag: "🇺🇸", format: "XXX XXX XXXX" }
]

const PhoneField: TextFieldClientComponent = (props) => {
	const { field, path, readOnly } = props

	const { code: locale } = useLocale()

	const { value, setValue } = useField<any>({ path })

	const [selectedCode, setSelectedCode] = useState("+961")

	const [localNumber, setLocalNumber] = useState("")

	const label = typeof field?.label === "string" ? field.label : field?.label?.en || "Phone Number"

	const required = field?.required || false

	useEffect(() => {
		if (!value) return

		const raw = typeof value === "object" ? value?.[locale] || value?.en || "" : value

		const matched = countryCodes.find((c) => raw.startsWith(c.code))

		if (matched) {
			setSelectedCode(matched.code)
			setLocalNumber(raw.slice(matched.code.length))
		} else {
			setLocalNumber(raw)
		}
	}, [value, locale])

	const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newCode = e.target.value

		setSelectedCode(newCode)

		const cleanNumber = localNumber.replace(/\s/g, "")

		if (field.localized) {
			setValue({
				...value,
				[locale]: newCode + cleanNumber
			})
		} else {
			setValue(newCode + cleanNumber)
		}
	}

	const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value

		// allow Arabic + Western digits only
		const digitsOnly = input.replace(/[^\d٠-٩]/g, "")

		setLocalNumber(digitsOnly)

		const cleanNumber = digitsOnly.replace(/\s/g, "")

		// Handle localized storage
		if (field.localized) {
			setValue({
				...value,
				[locale]: selectedCode + cleanNumber
			})
		} else {
			setValue(selectedCode + cleanNumber)
		}
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
