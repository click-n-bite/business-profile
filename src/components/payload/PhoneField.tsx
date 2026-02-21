"use client"

import React, { useState, useEffect } from "react"
import { useField } from "@payloadcms/ui"
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

	const { value, setValue } = useField<string>({ path })

	const [selectedCode, setSelectedCode] = useState("+961")

	const [localNumber, setLocalNumber] = useState("")

	const label = typeof field?.label === "string" ? field.label : field?.label?.en || "Phone Number"

	const required = field?.required || false

	// Load initial value
	useEffect(() => {
		if (!value) return

		const matched = countryCodes.find((c) => value.startsWith(c.code))

		if (matched) {
			setSelectedCode(matched.code)
			setLocalNumber(value.slice(matched.code.length))
		} else {
			setLocalNumber(value)
		}
	}, [value])

	const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newCode = e.target.value

		setSelectedCode(newCode)
		setValue(newCode + localNumber.replace(/\s/g, ""))
	}

	const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value

		// Allow only digits
		const digitsOnly = input.replace(/[^\d]/g, "")

		setLocalNumber(digitsOnly)
		setValue(selectedCode + digitsOnly)
	}

	// Format display with spaces (every 2 digits for Lebanon, otherwise every 3)
	const formatDisplayNumber = (num: string) => {
		if (selectedCode === "+961") {
			// Lebanese format: pairs
			const pairs = []

			for (let i = 0; i < num.length; i += 2) {
				pairs.push(num.slice(i, i + 2))
			}

			return pairs.join(" ")
		}

		// Default: groups of 3
		return num.replace(/(\d{3})(?=\d)/g, "$1 ")
	}

	return (
		<div className='field-type' style={{ marginBottom: "20px" }}>
			<label className='field-label'>
				{label}
				{required && <span className='required'>*</span>}
			</label>

			<div style={{ display: "flex", gap: "8px", direction: "ltr" }}>
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
					value={formatDisplayNumber(localNumber)}
					onChange={handleNumberChange}
					disabled={readOnly}
					placeholder={selectedCode === "+961" ? "03 05 43 35" : "050 123 4567"}
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

			{/* Preview */}
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
					{selectedCode} {formatDisplayNumber(localNumber) || (selectedCode === "+961" ? "03 XX XX XX" : "XXX XXX XXX")}
				</span>
			</div>
		</div>
	)
}

export default PhoneField
