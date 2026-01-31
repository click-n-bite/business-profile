// "use client"

// import { useState } from "react"
// import { createContactVCard } from "@/utils/contact-utils"
// import ContactSavedModal from "@/components/tenant/tenant-contact-modal"

// export const useSaveContact = () => {
// 	const [modalOpen, setModalOpen] = useState(false)

// 	const [savedName, setSavedName] = useState("")

// 	const saveContact = (name: string, phoneNumber: string): void => {
// 		createContactVCard(name, phoneNumber)

// 		setSavedName(name)
// 		setModalOpen(true)
// 	}

// 	const ContactModal = () => (
// 		<ContactSavedModal isOpen={modalOpen} onClose={() => setModalOpen(false)} name={savedName} />
// 	)

// 	return {
// 		saveContact,
// 		ContactModal,
// 		isModalOpen: modalOpen,
// 		setModalOpen
// 	}
// }
"use client"

import { useState } from "react"
import { createContactVCard } from "@/utils/contact-utils"
import ContactSavedModal from "@/components/tenant/tenant-contact-modal"

export const useSaveContact = () => {
	const [modalOpen, setModalOpen] = useState(false)

	const [contactData, setContactData] = useState({ name: "", phone: "" })

	const showSaveModal = (name: string, phone: string) => {
		setContactData({ name, phone })
		setModalOpen(true)
	}

	const saveContact = () => {
		const { name, phone } = contactData

		createContactVCard(name, phone)
		setModalOpen(false)
	}

	const closeModal = () => {
		setModalOpen(false)
		setContactData({ name: "", phone: "" })
	}

	return {
		saveContact: showSaveModal,

		ContactModal: () => (
			<ContactSavedModal
				isOpen={modalOpen}
				onClose={closeModal}
				onSave={saveContact}
				name={contactData.name}
				phone={contactData.phone}
			/>
		),
		isModalOpen: modalOpen
	}
}
