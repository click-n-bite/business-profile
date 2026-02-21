export const formatPhoneForDisplay = (phone: string) => {
	if (!phone) return ""

	const clean = phone.replace(/[^\d+]/g, "")

	const match = clean.match(/^\+(\d{1,4})/)

	if (!match) return clean

	const countryCode = "+" + match[1]

	const number = clean.slice(countryCode.length)

	const formattedNumber = number.replace(/(\d{2,3})(?=\d)/g, "$1 ")

	return `${countryCode} ${formattedNumber}`.trim()
}

export const westernToArabic = (str: string) => {
	const map = {
		0: "٠",
		1: "١",
		2: "٢",
		3: "٣",
		4: "٤",
		5: "٥",
		6: "٦",
		7: "٧",
		8: "٨",
		9: "٩"
	}

	return str.replace(/\d/g, (d) => map[d as unknown as keyof typeof map])
}
