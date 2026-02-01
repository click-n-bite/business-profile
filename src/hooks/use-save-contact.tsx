"use client"

import { useState, useCallback } from "react"
import { createContactVCard } from "@/utils/contact-utils"
import ContactSavedModal from "@/components/tenant/tenant-contact-modal"

export const useSaveContact = () => {
	const [modalOpen, setModalOpen] = useState(false)

	const [contactData, setContactData] = useState({ name: "", phone: "" })

	const showSaveModal = useCallback((name: string, phone: string) => {
		setContactData({ name, phone })
		setModalOpen(true)
	}, [])

	const saveContact = useCallback(() => {
		const { name, phone } = contactData

		if (name && phone) {
			createContactVCard(name, phone)
		}
	}, [contactData])

	const closeModal = useCallback(() => {
		setModalOpen(false)
		setTimeout(() => setContactData({ name: "", phone: "" }), 300)
	}, [])

	const ContactModal = useCallback(
		() => (
			<ContactSavedModal
				isOpen={modalOpen}
				onClose={closeModal}
				onSave={saveContact}
				name={contactData.name}
				phone={contactData.phone}
			/>
		),
		[modalOpen, closeModal, saveContact, contactData]
	)

	return {
		saveContact: showSaveModal,
		ContactModal,
		isModalOpen: modalOpen
	}
}
