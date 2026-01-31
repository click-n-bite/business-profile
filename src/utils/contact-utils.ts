// export const formatPhoneNumberSimple = (phoneNumber: string): string => {
// 	return phoneNumber.replace(/\D/g, "")
// }

// export const saveContactSimple = (name: string, phoneNumber: string): void => {
// 	const formattedPhone = formatPhoneNumberSimple(phoneNumber)

// 	const createVCard = () => {
// 		const vCardData = ["BEGIN:VCARD", "VERSION:3.0", `FN:${name}`, `TEL;TYPE=CELL:${formattedPhone}`, "END:VCARD"].join(
// 			"\n"
// 		)

// 		const blob = new Blob([vCardData], { type: "text/vcard" })

// 		const url = URL.createObjectURL(blob)

// 		const link = document.createElement("a")

// 		link.href = url
// 		link.download = `${name.replace(/\s+/g, "_")}.vcf`
// 		link.style.display = "none"
// 		document.body.appendChild(link)
// 		link.click()

// 		setTimeout(() => {
// 			document.body.removeChild(link)
// 			URL.revokeObjectURL(url)
// 		}, 100)
// 	}

// 	const UseAndroidIntent = () => {
// 		const intentUrl = `intent://contact/add?name=${encodeURIComponent(name)}&phone=${formattedPhone}#Intent;scheme=android-app;end;`

// 		const fallback = setTimeout(createVCard, 1000)

// 		window.location.href = intentUrl

// 		window.addEventListener("pagehide", () => clearTimeout(fallback), { once: true })
// 	}

// 	const userAgent = navigator.userAgent.toLowerCase()

// 	const isAndroid = userAgent.includes("android")

// 	if (isAndroid) {
// 		try {
// 			UseAndroidIntent()
// 		} catch (err) {
// 			console.log("error:", err)
// 			createVCard()
// 		}
// 	} else {
// 		createVCard()
// 	}
// }

// export const saveContactDesktopSimple = (name: string, phoneNumber: string): void => {
// 	const formattedPhone = formatPhoneNumberSimple(phoneNumber)

// 	const vCardData = ["BEGIN:VCARD", "VERSION:3.0", `FN:${name}`, `TEL;TYPE=CELL:${formattedPhone}`, "END:VCARD"].join(
// 		"\n"
// 	)

// 	const blob = new Blob([vCardData], { type: "text/vcard" })

// 	const url = URL.createObjectURL(blob)

// 	const link = document.createElement("a")

// 	link.href = url
// 	link.download = `${name.replace(/\s+/g, "_")}.vcf`
// 	link.style.display = "none"
// 	document.body.appendChild(link)
// 	link.click()

// 	setTimeout(() => {
// 		document.body.removeChild(link)
// 		URL.revokeObjectURL(url)
// 	}, 100)
// }

// export const quickSaveContact = (name: string, phoneNumber: string): void => {
// 	const formattedPhone = formatPhoneNumberSimple(phoneNumber)

// 	const vCardData = ["BEGIN:VCARD", "VERSION:3.0", `FN:${name}`, `TEL;TYPE=CELL:${formattedPhone}`, "END:VCARD"].join(
// 		"\n"
// 	)

// 	const blob = new Blob([vCardData], { type: "text/vcard" })

// 	const url = URL.createObjectURL(blob)

// 	const link = document.createElement("a")

// 	link.href = url
// 	link.download = `${name.replace(/\s+/g, "_")}.vcf`
// 	link.style.display = "none"
// 	document.body.appendChild(link)
// 	document.body.appendChild(link)
// 	link.click()

// 	setTimeout(() => {
// 		document.body.removeChild(link)
// 		URL.revokeObjectURL(url)
// 	}, 100)
// }
export const formatPhoneNumberSimple = (phoneNumber: string): string => {
	return phoneNumber.replace(/\D/g, "")
}

export const saveContactWithContactsAPI = async (name: string, phoneNumber: string): Promise<void> => {
	const formattedPhone = formatPhoneNumberSimple(phoneNumber)

	const isSecureContext =
		window.isSecureContext ||
		window.location.protocol === "https:" ||
		window.location.hostname === "localhost" ||
		window.location.hostname === "127.0.0.1"

	if ("contacts" in navigator && "ContactsManager" in window && isSecureContext) {
		try {
			const contacts = await navigator.contacts.select(["name", "tel"], { multiple: false })

			if (contacts && contacts.length > 0) {
				console.log("Contact selected for saving:", contacts[0])

				return
			}
		} catch (error) {
			console.log("Contacts API failed or user cancelled:", error)
			throw error
		}
	} else {
		throw new Error("Contacts API not available")
	}
}

export const saveContactEnhanced = async (name: string, phoneNumber: string): Promise<void> => {
	const formattedPhone = formatPhoneNumberSimple(phoneNumber)

	const vCardData = ["BEGIN:VCARD", "VERSION:3.0", `FN:${name}`, `TEL;TYPE=CELL:${formattedPhone}`, "END:VCARD"].join(
		"\n"
	)

	const isSecureContext =
		window.isSecureContext ||
		window.location.protocol === "https:" ||
		window.location.hostname === "localhost" ||
		window.location.hostname === "127.0.0.1"

	if (navigator.share && isSecureContext) {
		try {
			const blob = new Blob([vCardData], { type: "text/vcard" })

			const file = new File([blob], `${name}.vcf`, { type: "text/vcard" })

			if (navigator.canShare && navigator.canShare({ files: [file] })) {
				await navigator.share({
					files: [file],
					title: `Save ${name} Contact`,
					text: `Contact information for ${name}`
				})

				return
			}
		} catch (error) {
			console.log("Web Share API failed:", error)
		}
	}

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
	}, 1000)
}

export const quickSaveContact = (name: string, phoneNumber: string): void => {
	saveContactEnhanced(name, phoneNumber)
}

export const showSaveNotification = (name: string) => {
	if (typeof window !== "undefined") {
		if ("Notification" in window && Notification.permission === "granted") {
			new Notification(`Contact Saved`, {
				body: `${name} has been saved to your contacts`,
				icon: "/icon.png"
			})
		} else {
			console.log(`Contact saved: ${name}`)
		}
	}
}
