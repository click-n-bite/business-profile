"use client"

import { Phone, MessageCircle, Send, Mail, Save } from "lucide-react"
import { formatPhoneNumberSimple, quickSaveContact } from "@/utils/contact-utils"
import { PersonalContactProps } from "../../types"

const iconMap = {
	whatsapp: MessageCircle,
	telegram: Send,
	telephone: Phone,
	email: Mail,
	save: Save
}

export function PersonalContact({ contactDepartments, theme }: PersonalContactProps) {
	const primary = theme?.primaryColor

	const handleSaveContact = (title: string, phone: string) => {
		quickSaveContact(title, phone)
	}

	return (
		<div className='w-full space-y-3'>
			{contactDepartments.map((dept) => {
				const contactOptions = [
					{ key: "save", label: "Save Contact", action: () => handleSaveContact(dept.title, dept.phone) },
					{ key: "telephone", label: "Call", action: `tel:${dept.phone}`, show: dept.telephone },
					{
						key: "whatsapp",
						label: "WhatsApp",
						action: `https://wa.me/${formatPhoneNumberSimple(dept.phone)}`,
						show: dept.whatsapp
					},
					{
						key: "telegram",
						label: "Telegram",
						action: `https://t.me/${formatPhoneNumberSimple(dept.phone)}`,
						show: dept.telegram
					}
				].filter((option) => option.show !== false)

				return (
					<div key={dept.id} className='space-y-3'>
						<div
							className='group flex items-center justify-between rounded-lg border bg-white p-4 transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900'
							style={{
								borderColor: primary ? `${primary}20` : undefined,
								backgroundColor: primary ? `${primary}05` : undefined
							}}>
							<div className='flex items-center gap-4'>
								<div
									className='flex h-10 w-10 items-center justify-center rounded-md'
									style={{
										backgroundColor: primary ? `${primary}15` : undefined
									}}>
									<Phone className='h-5 w-5' style={{ color: primary }} />
								</div>
								<div className='text-left'>
									<div className='text-lg font-medium text-gray-900 dark:text-white'>{dept.title}</div>
									<div className='font-mono text-sm text-gray-500 dark:text-gray-400'>{dept.phone}</div>
									{dept.email && <div className='text-sm text-gray-500 dark:text-gray-400'>{dept.email}</div>}
								</div>
							</div>
							<span className='text-sm text-gray-500 dark:text-gray-400'>↗</span>
						</div>

						<div className='flex flex-wrap items-end justify-end gap-2'>
							{contactOptions.map((option) => {
								const Icon = iconMap[option.key as keyof typeof iconMap]

								if (typeof option.action === "string") {
									return (
										<a
											key={option.key}
											href={option.action}
											target={option.action.startsWith("http") ? "_blank" : undefined}
											rel='noopener noreferrer'
											className='group flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition-all hover:shadow-sm dark:border-gray-800 dark:bg-gray-900'
											style={{
												borderColor: primary ? `${primary}20` : undefined,
												backgroundColor: primary ? `${primary}05` : undefined
											}}>
											<Icon className='h-4 w-4' />
											<span className='hidden text-gray-700 md:block dark:text-gray-300'>{option.label}</span>
										</a>
									)
								}

								return (
									<button
										key={option.key}
										onClick={option.action}
										className='group flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition-all hover:shadow-sm dark:border-gray-800 dark:bg-gray-900'
										style={{
											borderColor: primary ? `${primary}20` : undefined,
											backgroundColor: primary ? `${primary}05` : undefined
										}}>
										<Icon className='h-4 w-4' />
										<span className='hidden text-gray-700 md:block dark:text-gray-300'>{option.label}</span>
									</button>
								)
							})}
						</div>
					</div>
				)
			})}
		</div>
	)
}
