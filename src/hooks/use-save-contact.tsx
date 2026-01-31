"use client"

import { useState } from "react"
import { createContactVCard } from "@/utils/contact-utils"
import ContactSavedModal from "@/components/tenant/tenant-contact-modal"

export const useSaveContact = () => {
	const [modalOpen, setModalOpen] = useState(false)

	const [savedName, setSavedName] = useState("")

	const saveContact = (name: string, phoneNumber: string): void => {
		createContactVCard(name, phoneNumber)

		setSavedName(name)
		setModalOpen(true)
	}

	const ContactModal = () => (
		<ContactSavedModal isOpen={modalOpen} onClose={() => setModalOpen(false)} name={savedName} />
	)

	return {
		saveContact,
		ContactModal,
		isModalOpen: modalOpen,
		setModalOpen
	}
}
