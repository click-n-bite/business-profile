// export const formatPhoneNumberSimple = (phoneNumber: string): string => {
// 	return phoneNumber.replace(/\D/g, "")
// }

// export const saveContactSimple = (name: string, phoneNumber: string): void => {
// 	const link = document.createElement("a")

// 	const formattedPhone = formatPhoneNumberSimple(phoneNumber)

// 	const encodedName = encodeURIComponent(name)

// 	link.href = `tel:${formattedPhone}?add=1&name=${encodedName}`

// 	link.setAttribute("data-action", "add-contact")
// 	link.setAttribute("data-phone", formattedPhone)
// 	link.setAttribute("data-name", name)

// 	link.style.display = "none"
// 	document.body.appendChild(link)
// 	link.click()
// 	document.body.removeChild(link)
// }

// export const saveContactDesktopSimple = (name: string, phoneNumber: string): void => {
// 	const message = `To save this contact:\n\nName: ${name}\nPhone: ${phoneNumber}\n\nCopy the information and paste into your contacts app.`

// 	alert(message)

// 	if (navigator.clipboard) {
// 		navigator.clipboard
// 			.writeText(`${name}: ${phoneNumber}`)
// 			.then(() => console.log("Copied to clipboard"))
// 			.catch((err) => console.error("Failed to copy:", err))
// 	}
// }

// export const quickSaveContact = (name: string, phoneNumber: string): void => {
// 	const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

// 	if (isMobile) {
// 		saveContactSimple(name, phoneNumber)
// 	} else {
// 		saveContactDesktopSimple(name, phoneNumber)
// 	}
// }

export const formatPhoneNumberSimple = (phoneNumber: string): string => {
	return phoneNumber.replace(/\D/g, "")
}

export const saveContactSimple = (name: string, phoneNumber: string): void => {
	const formattedPhone = formatPhoneNumberSimple(phoneNumber)

	// Method 1: Use vCard download (works on most devices)
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

		// Cleanup
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

export const quickSaveContact = (name: string, phoneNumber: string): void => {
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
	document.body.appendChild(link)
	link.click()

	setTimeout(() => {
		document.body.removeChild(link)
		URL.revokeObjectURL(url)
	}, 100)
}
