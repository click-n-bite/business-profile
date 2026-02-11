export const formatPhoneNumberSimple = (phoneNumber: string): string => {
	const converted = phoneNumber
		.replace(/[٠-٩]/g, (d) => {
			return String.fromCharCode(d.charCodeAt(0) - 1632)
		})
		.replace(/[۰-۹]/g, (d) => {
			return String.fromCharCode(d.charCodeAt(0) - 1776)
		})

	return converted.replace(/\D/g, "")
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
