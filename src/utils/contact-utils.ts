export const formatPhoneNumberSimple = (phoneNumber: string): string => {
	return phoneNumber.replace(/\D/g, "")
}

export const saveContactSimple = (name: string, phoneNumber: string): void => {
	const link = document.createElement("a")

	const formattedPhone = formatPhoneNumberSimple(phoneNumber)

	const encodedName = encodeURIComponent(name)

	link.href = `tel:${formattedPhone}?add=1&name=${encodedName}`

	link.setAttribute("data-action", "add-contact")
	link.setAttribute("data-phone", formattedPhone)
	link.setAttribute("data-name", name)

	link.style.display = "none"
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}

export const saveContactDesktopSimple = (name: string, phoneNumber: string): void => {
	const message = `To save this contact:\n\nName: ${name}\nPhone: ${phoneNumber}\n\nCopy the information and paste into your contacts app.`

	alert(message)

	if (navigator.clipboard) {
		navigator.clipboard
			.writeText(`${name}: ${phoneNumber}`)
			.then(() => console.log("Copied to clipboard"))
			.catch((err) => console.error("Failed to copy:", err))
	}
}

export const quickSaveContact = (name: string, phoneNumber: string): void => {
	const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

	if (isMobile) {
		saveContactSimple(name, phoneNumber)
	} else {
		saveContactDesktopSimple(name, phoneNumber)
	}
}
