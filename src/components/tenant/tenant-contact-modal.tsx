// "use client"

// import { useEffect, useState } from "react"
// import { X, CheckCircle, Download, Smartphone } from "lucide-react"
// import { cn } from "@/utils/cn"
// import { useTranslations } from "next-intl"

// interface ContactSavedModalProps {
// 	isOpen: boolean
// 	onClose: () => void
// 	name: string
// }

// const ContactSavedModal = ({ isOpen, onClose, name }: ContactSavedModalProps) => {
// 	const t = useTranslations("contactModal")

// 	const [isMounted, setIsMounted] = useState(false)

// 	useEffect(() => {
// 		if (isOpen) {
// 			setIsMounted(true)
// 			document.body.style.overflow = "hidden"
// 		} else {
// 			document.body.style.overflow = "unset"
// 		}

// 		return () => {
// 			document.body.style.overflow = "unset"
// 		}
// 	}, [isOpen])

// 	if (!isOpen || !isMounted) return null

// 	return (
// 		<div className='fixed inset-0 z-[9999] flex items-end justify-center sm:items-center'>
// 			<div className='animate-in fade-in-0 fixed inset-0 bg-black/50 duration-300' onClick={onClose} />

// 			<div
// 				className={cn(
// 					"relative z-[9999] w-full max-w-md bg-white shadow-2xl dark:bg-gray-900",
// 					"rounded-t-2xl sm:rounded-2xl",
// 					"fixed bottom-0 sm:relative sm:mx-4 sm:max-h-[85vh]",
// 					"animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 duration-300",
// 					"flex flex-col overflow-hidden"
// 				)}>
// 				<div className='sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900'>
// 					<h3 className='text-lg font-semibold'>{t("title")}</h3>
// 					<button
// 						onClick={onClose}
// 						className='rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800'
// 						aria-label={t("close")}>
// 						<X className='h-5 w-5' />
// 					</button>
// 				</div>

// 				<div className='flex-1 overflow-y-auto p-6'>
// 					<div className='mb-6 text-center'>
// 						<div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30'>
// 							<CheckCircle className='h-8 w-8 text-green-600 dark:text-green-400' />
// 						</div>
// 						<p className='text-muted-foreground mt-2'>{t("description", { name })}</p>
// 					</div>

// 					<div className='mb-6 space-y-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50'>
// 						<h4 className='font-medium text-gray-900 dark:text-white'>{t("nextSteps.title")}</h4>

// 						<div className='space-y-3'>
// 							<div className='flex items-start gap-3'>
// 								<div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30'>
// 									<span className='text-sm font-medium text-blue-600 dark:text-blue-400'>1</span>
// 								</div>
// 								<div>
// 									<p className='text-sm font-medium text-gray-900 dark:text-white'>{t("nextSteps.step1.title")}</p>
// 									<p className='text-muted-foreground text-sm'>{t.rich("nextSteps.step1.description")}</p>
// 								</div>
// 							</div>

// 							<div className='flex items-start gap-3'>
// 								<div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30'>
// 									<span className='text-sm font-medium text-blue-600 dark:text-blue-400'>2</span>
// 								</div>
// 								<div>
// 									<p className='text-sm font-medium text-gray-900 dark:text-white'>{t("nextSteps.step2.title")}</p>
// 									<p className='text-muted-foreground text-sm'>{t("nextSteps.step2.description")}</p>
// 								</div>
// 							</div>

// 							<div className='flex items-start gap-3'>
// 								<div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30'>
// 									<span className='text-sm font-medium text-blue-600 dark:text-blue-400'>3</span>
// 								</div>
// 								<div>
// 									<p className='text-sm font-medium text-gray-900 dark:text-white'>{t("nextSteps.step3.title")}</p>
// 									<p className='text-muted-foreground text-sm'>{t("nextSteps.step3.description")}</p>
// 								</div>
// 							</div>
// 						</div>
// 					</div>

// 					<div className='mb-6'>
// 						<h4 className='mb-3 font-medium text-gray-900 dark:text-white'>{t("deviceInfo.title")}</h4>
// 						<div className='grid gap-3'>
// 							<div className='flex items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-gray-700'>
// 								<Smartphone className='h-5 w-5 text-blue-500' />
// 								<div>
// 									<p className='text-sm font-medium'>{t("deviceInfo.mobile.title")}</p>
// 									<p className='text-muted-foreground text-sm'>{t("deviceInfo.mobile.description")}</p>
// 								</div>
// 							</div>
// 							<div className='flex items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-gray-700'>
// 								<Download className='h-5 w-5 text-green-500' />
// 								<div>
// 									<p className='text-sm font-medium'>{t("deviceInfo.desktop.title")}</p>
// 									<p className='text-muted-foreground text-sm'>{t("deviceInfo.desktop.description")}</p>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default ContactSavedModal
"use client"

import { useEffect, useRef } from "react"
import { X, AlertCircle } from "lucide-react"
import { cn } from "@/utils/cn"
import { useTranslations } from "next-intl"

interface ContactSavedModalProps {
	isOpen: boolean
	onClose: () => void
	onSave: () => void
	name: string
	phone?: string
}

const ContactSavedModal = ({ isOpen, onClose, onSave, name, phone }: ContactSavedModalProps) => {
	const t = useTranslations("contactModal")

	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden")

			if (modalRef.current) {
				modalRef.current.getBoundingClientRect()
			}
		} else {
			document.body.classList.remove("overflow-hidden")
		}

		return () => {
			document.body.classList.remove("overflow-hidden")
		}
	}, [isOpen])

	const handleSave = () => {
		onSave()
		onClose()
	}

	if (!isOpen) return null

	return (
		<>
			<div
				className={cn(
					"fixed inset-0 z-[9998] bg-black/50",
					"transition-opacity duration-200",
					isOpen ? "opacity-100" : "opacity-0"
				)}
				onClick={onClose}
			/>

			<div
				ref={modalRef}
				className={cn(
					"fixed inset-0 z-[9999] flex items-end justify-center sm:items-center",
					"transition-opacity duration-200",
					isOpen ? "opacity-100" : "pointer-events-none opacity-0"
				)}>
				<div
					className={cn(
						"relative z-[9999] w-full max-w-md bg-white shadow-2xl dark:bg-gray-900",
						"rounded-t-2xl sm:rounded-2xl",
						"max-h-[85vh] overflow-hidden",
						"transform transition-transform duration-300 ease-out",
						isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 sm:translate-y-4"
					)}>
					{/* Header - Simple */}
					<div className='sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900'>
						<h3 className='text-lg font-semibold'>{t("title")}</h3>
						<button
							onClick={onClose}
							className='rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800'
							aria-label={t("close")}>
							<X className='h-5 w-5' />
						</button>
					</div>

					<div className='overflow-y-auto p-6'>
						<div className='mb-6 text-center'>
							<div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30'>
								<AlertCircle className='h-8 w-8 text-yellow-600 dark:text-yellow-400' />
							</div>
							<h3 className='text-xl font-semibold text-gray-900 dark:text-white'>{t("confirmationTitle")}</h3>
							<p className='text-muted-foreground mt-2'>{t("confirmationDescription", { name })}</p>
							{phone && <p className='mt-2 font-mono text-sm text-gray-600 dark:text-gray-400'>{phone}</p>}
						</div>
					</div>

					<div className='sticky bottom-0 border-t border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900'>
						<div className='grid grid-cols-2 gap-3'>
							<button
								onClick={onClose}
								className='w-full rounded-lg border border-gray-300 px-4 py-3 font-medium transition-colors hover:bg-gray-50 active:scale-95 dark:border-gray-700 dark:hover:bg-gray-800'>
								{t("buttons.cancel")}
							</button>
							<button
								onClick={handleSave}
								className='bg-primary hover:bg-primary/90 active:bg-primary/80 w-full rounded-lg px-4 py-3 font-medium text-white transition-colors active:scale-95'>
								{t("buttons.save")}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ContactSavedModal
