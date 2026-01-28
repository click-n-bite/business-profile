"use client"

import Image from "next/image"
import { formatPhoneNumberSimple, quickSaveContact } from "@/utils/contact-utils"
import { PersonalContactProps } from "../../types"
import { Phone } from "lucide-react"

export function PersonalContact({ contactDepartments }: PersonalContactProps) {
	const handleSaveContact = (title: string, phone: string) => {
		quickSaveContact(title, phone)
	}

	return (
		<div className='w-full space-y-3'>
			{contactDepartments.map((dept) => {
				const leftButtons = [
					{
						key: "save",
						label: "Save",
						action: () => handleSaveContact(dept.title, dept.phone),
						icon: "/images/bookmark.png"
					},
					{
						key: "telephone",
						label: "Call",
						action: `tel:${dept.phone}`,
						icon: "/images/phone-call.png",
						show: dept.telephone
					}
				].filter((option) => option.show !== false)

				const rightButtons = [
					{
						key: "sms",
						label: "Message",
						action: `sms:${dept.phone}`,
						icon: "/images/sms.png"
					},
					{
						key: "whatsapp",
						label: "WhatsApp",
						action: `https://wa.me/${formatPhoneNumberSimple(dept.phone)}`,
						icon: "/images/whatsapp.png",
						show: dept.whatsapp
					},
					{
						key: "telegram",
						label: "Telegram",
						action: `https://t.me/${formatPhoneNumberSimple(dept.phone)}`,
						icon: "/images/telegram.png",
						show: dept.telegram
					}
				].filter((option) => option.show !== false)

				return (
					<div key={dept.id} className='space-y-3'>
						<div className='group flex items-center justify-between rounded-lg bg-white p-4 transition-all hover:shadow-md dark:bg-[#1a1a1aa3]'>
							<div className='flex items-center gap-4'>
								<div className='rounded-lg bg-[#191919] p-3'>
									<Phone className='h-5 w-5' />
								</div>
								<div className='text-left'>
									<div className='text-lg font-medium text-gray-900 dark:text-white'>{dept.title}</div>
									<div className='font-mono text-sm text-gray-500 dark:text-gray-400'>{dept.phone}</div>
									{dept.email && <div className='text-sm text-gray-500 dark:text-gray-400'>{dept.email}</div>}
								</div>
							</div>
							<span className='text-sm text-gray-500 dark:text-gray-400'>↗</span>
						</div>

						<div className='flex items-center justify-between'>
							<div className='flex gap-2'>
								{rightButtons.map((option) => {
									return (
										<a
											key={option.key}
											href={option.action}
											target={option.action.startsWith("http") ? "_blank" : undefined}
											rel='noopener noreferrer'
											className='flex items-center justify-center rounded-lg bg-slate-100 p-2 text-slate-500 transition-colors hover:bg-blue-100 hover:text-blue-600 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-blue-500/20 dark:hover:text-blue-500'>
											<Image src={option.icon} alt={option.label} width={20} height={20} className='h-5 w-5' />
										</a>
									)
								})}
							</div>
							<div className='flex gap-2'>
								{leftButtons.map((option) => {
									if (typeof option.action === "string") {
										return (
											<a
												key={option.key}
												href={option.action}
												className='flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-green-100 hover:text-green-600 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-green-500/20 dark:hover:text-green-400'>
												<Image src={option.icon} alt={option.label} width={20} height={20} className='h-5 w-5' />
											</a>
										)
									}

									return (
										<button
											key={option.key}
											onClick={option.action}
											className='flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'>
											<Image src={option.icon} alt={option.label} width={20} height={20} className='h-5 w-5' />
										</button>
									)
								})}
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}
