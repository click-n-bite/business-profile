// export const formatPhoneNumberSimple = (phoneNumber: string): string => {
// 	if (!phoneNumber) return ""

// 	const digitMap: Record<string, string> = {
// 		"٠": "0",
// 		"١": "1",
// 		"٢": "2",
// 		"٣": "3",
// 		"٤": "4",
// 		"٥": "5",
// 		"٦": "6",
// 		"٧": "7",
// 		"٨": "8",
// 		"٩": "9",
// 		"۰": "0",
// 		"۱": "1",
// 		"۲": "2",
// 		"۳": "3",
// 		"۴": "4",
// 		"۵": "5",
// 		"۶": "6",
// 		"۷": "7",
// 		"۸": "8",
// 		"۹": "9"
// 	}

// 	const converted = phoneNumber
// 		.split("")
// 		.map((char) => digitMap[char] || char)
// 		.join("")

// 	return converted.replace(/[^\d+]/g, "")
// }

export const formatPhoneNumberSimple = (phoneNumber: string): string => {
	if (!phoneNumber) return ""

	const digitMap: Record<string, string> = {
		"٠": "0",
		"١": "1",
		"٢": "2",
		"٣": "3",
		"٤": "4",
		"٥": "5",
		"٦": "6",
		"٧": "7",
		"٨": "8",
		"٩": "9",
		"۰": "0",
		"۱": "1",
		"۲": "2",
		"۳": "3",
		"۴": "4",
		"۵": "5",
		"۶": "6",
		"۷": "7",
		"۸": "8",
		"۹": "9"
	}

	const cleanText = phoneNumber.replace(/[\u200E\u200F\u202A-\u202E\s]/g, "")

	const isRTLFormat = cleanText.endsWith("+")

	let digits = cleanText
		.replace("+", "")
		.split("")
		.map((char) => digitMap[char] || char)
		.filter((char) => /^\d$/.test(char))

	if (isRTLFormat) {
		digits = digits.reverse()
	}

	return "+" + digits.join("")
}

export const saveContactSimple = (name: string, phoneNumber: string): void => {
	const formattedPhone = formatPhoneNumberSimple(phoneNumber)

	const createVCard = () => {
		const vCardData = ["BEGIN:VCARD", "VERSION:3.0", `FN:${name}`, `TEL;TYPE=CELL:${formattedPhone}`, "END:VCARD"].join(
			"\n"
		)

		const blob = new Blob([vCardData], { type: "text/vcard" })

		const url = URL.createObjectURL(blob)

		const link = document.createElement("a")

		link.href = url
		link.download = `${name.replace(/\s+/g, "_")}.vcf`
		link.style.display = "none"
		document.body.appendChild(link)
		link.click()

		setTimeout(() => {
			document.body.removeChild(link)
			URL.revokeObjectURL(url)
		}, 100)
	}

	const UseAndroidIntent = () => {
		const intentUrl = `intent://contact/add?name=${encodeURIComponent(name)}&phone=${formattedPhone}#Intent;scheme=android-app;end;`

		const fallback = setTimeout(createVCard, 1000)

		window.location.href = intentUrl

		window.addEventListener("pagehide", () => clearTimeout(fallback), { once: true })
	}

	const userAgent = navigator.userAgent.toLowerCase()

	const isAndroid = userAgent.includes("android")

	if (isAndroid) {
		try {
			UseAndroidIntent()
		} catch (err) {
			console.log("error:", err)
			createVCard()
		}
	} else {
		createVCard()
	}
}

export const saveContactDesktopSimple = (name: string, phoneNumber: string): void => {
	const formattedPhone = formatPhoneNumberSimple(phoneNumber)

	const vCardData = ["BEGIN:VCARD", "VERSION:3.0", `FN:${name}`, `TEL;TYPE=CELL:${formattedPhone}`, "END:VCARD"].join(
		"\n"
	)

	const blob = new Blob([vCardData], { type: "text/vcard" })

	const url = URL.createObjectURL(blob)

	const link = document.createElement("a")

	link.href = url
	link.download = `${name.replace(/\s+/g, "_")}.vcf`
	link.style.display = "none"
	document.body.appendChild(link)
	link.click()

	setTimeout(() => {
		document.body.removeChild(link)
		URL.revokeObjectURL(url)
	}, 100)
}

export const createContactVCard = (name: string, phoneNumber: string): void => {
	const formattedPhone = formatPhoneNumberSimple(phoneNumber)

	const vCardData = ["BEGIN:VCARD", "VERSION:3.0", `FN:${name}`, `TEL;TYPE=CELL:${formattedPhone}`, "END:VCARD"].join(
		"\n"
	)

	const blob = new Blob([vCardData], { type: "text/vcard" })

	const url = URL.createObjectURL(blob)

	const link = document.createElement("a")

	link.href = url
	link.download = `${name.replace(/\s+/g, "_")}.vcf`
	link.style.display = "none"
	document.body.appendChild(link)
	link.click()

	setTimeout(() => {
		document.body.removeChild(link)
		URL.revokeObjectURL(url)
	}, 100)
}

export const quickSaveContact = (name: string, phoneNumber: string): void => {
	createContactVCard(name, phoneNumber)
	alert(`Contact "${name}" saved as vCard file. Open the downloaded .vcf file to add to your contacts.`)
}
