export const formatPhoneForDisplay = (phone: string, locale: string = "en") => {
	if (!phone) return ""

	const clean = phone.replace(/\s+/g, "")

	const match = clean.match(/^(\+\d{1,3})(\d+)$/)

	if (!match) return clean

	const countryCode = match[1]

	let number = match[2]

	if (countryCode === "+961") {
		number = number.replace(/\s/g, "")

		if (!number.startsWith("0")) {
			number = "0" + number
		}

		if (number.startsWith("00")) {
			number = number.slice(1)
		}

		const groups = []

		groups.push(number.slice(0, 2))

		for (let i = 2; i < number.length; i += 2) {
			groups.push(number.slice(i, i + 2))
		}

		const formatted = `${countryCode} ${groups.join(" ")}`

		return locale === "ar" ? westernToArabic(formatted) : formatted
	}

	const groups = number.match(/.{1,3}/g) || []

	const formatted = `${countryCode} ${groups.join(" ")}`

	return locale === "ar" ? westernToArabic(formatted) : formatted
}

export const westernToArabic = (str: string) => {
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

	return str.replace(/\d/g, (d) => map[d])
}
