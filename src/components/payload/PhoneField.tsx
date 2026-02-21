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

// Convert Western numbers to Arabic
const toArabicDigits = (str: string): string => {
	const map: Record<string, string> = {
		"0": "٠",
		"1": "١",
		"2": "٢",
		"3": "٣",
		"4": "٤",
		"5": "٥",
		"6": "٦",
		"7": "٧",
		"8": "٨",
		"9": "٩"
	}

	return str.replace(/[0-9]/g, (d) => map[d])
}

// Convert Arabic numbers to Western
const toWesternDigits = (str: string): string => {
	const map: Record<string, string> = {
		"٠": "0",
		"١": "1",
		"٢": "2",
		"٣": "3",
		"٤": "4",
		"٥": "5",
		"٦": "6",
		"٧": "7",
		"٨": "8",
		"٩": "9"
	}

	return str.replace(/[٠-٩]/g, (d) => map[d])
}

const PhoneField: TextFieldClientComponent = (props) => {
	const { field, path, readOnly } = props

	const { value, setValue } = useField<any>({ path })

	const { code: localeCode } = useLocale() // Get locale from hook

	const [selectedCode, setSelectedCode] = useState("+961")

	const [localNumber, setLocalNumber] = useState("")

	const [displayNumber, setDisplayNumber] = useState("")

	const label = typeof field?.label === "string" ? field.label : field?.label?.en || "Phone Number"

	const required = field?.required || false

	const isRTL = localeCode === "ar" // Check if Arabic

	// Load initial value
	useEffect(() => {
		if (!value) return

		// Handle localized value
		const raw = typeof value === "object" ? value?.[localeCode] || value?.en || "" : value

		// Convert to Western for processing
		const western = toWesternDigits(raw)

		const matched = countryCodes.find((c) => western.startsWith(c.code))

		if (matched) {
			setSelectedCode(matched.code)
			const number = western.slice(matched.code.length)

			setLocalNumber(number)
			// Display with or without Arabic digits based on locale
			setDisplayNumber(isRTL ? toArabicDigits(number) : number)
		} else {
			setLocalNumber(western)
			setDisplayNumber(isRTL ? toArabicDigits(western) : western)
		}
	}, [value, localeCode, isRTL])

	const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newCode = e.target.value

		setSelectedCode(newCode)

		// Store Western digits only
		const westernNumber = toWesternDigits(localNumber)

		const cleanNumber = westernNumber.replace(/\s/g, "")

		// Update display
		setDisplayNumber(isRTL ? toArabicDigits(cleanNumber) : cleanNumber)

		// Save to field
		if (field.localized) {
			// For localized fields, save as object
			setValue({
				...value,
				[localeCode]: newCode + cleanNumber
			})
		} else {
			setValue(newCode + cleanNumber)
		}
	}

	const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value

		// Convert to Western for processing
		const western = toWesternDigits(input)

		// Allow only digits
		const digitsOnly = western.replace(/[^\d]/g, "")

		setLocalNumber(digitsOnly)

		// Update display with proper digits based on locale
		setDisplayNumber(isRTL ? toArabicDigits(digitsOnly) : digitsOnly)

		// Save to field (always Western digits)
		if (field.localized) {
			setValue({
				...value,
				[localeCode]: selectedCode + digitsOnly
			})
		} else {
			setValue(selectedCode + digitsOnly)
		}
	}

	const getPlaceholder = () => {
		const placeholder = "03 00 00 00"

		return isRTL ? toArabicDigits(placeholder) : placeholder
	}

	return (
		<div className='field-type' style={{ marginBottom: "20px" }}>
			<label className='field-label'>
				{label}
				{required && <span className='required'>*</span>}
			</label>

			<div
				style={{
					display: "flex",
					gap: "8px",
					direction: "ltr"
				}}>
				<select
					value={selectedCode}
					onChange={handleCodeChange}
					disabled={readOnly}
					style={{
						width: "140px",
						padding: "10px",
						border: "1px solid #e2e8f0",
						borderRadius: "4px",
						backgroundColor: "white",
						fontSize: "14px",
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
					value={displayNumber}
					onChange={handleNumberChange}
					disabled={readOnly}
					placeholder={getPlaceholder()}
					style={{
						flex: 1,
						padding: "10px",
						border: "1px solid #e2e8f0",
						borderRadius: "4px",
						fontSize: "14px",
						fontFamily: "monospace",
						direction: "ltr",
						textAlign: "left"
					}}
				/>
			</div>

			{/* Preview with country code */}
			<div
				style={{
					marginTop: "8px",
					padding: "8px",
					backgroundColor: "#f8f9fa",
					borderRadius: "4px",
					fontSize: "13px",
					color: "#666",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center"
				}}>
				<span>Preview:</span>
				<span
					style={{
						fontFamily: "monospace",
						direction: "ltr",
						unicodeBidi: "embed",
						textAlign: "left",
						fontWeight: "500"
					}}>
					{isRTL ? (
						// Show plus + Arabic digits
						<>
							+{toArabicDigits(selectedCode.slice(1))} {displayNumber}
						</>
					) : (
						// Show normal
						<>
							{selectedCode} {displayNumber}
						</>
					)}
				</span>
			</div>
		</div>
	)
}

export default PhoneField
