"use client"

import { formatPhoneNumberSimple, quickSaveContact } from "@/utils/contact-utils"
import { Phone, MessageCircle, Save, Send } from "lucide-react"

interface DeptProps {
	title: string
	phone: string
	whatsapp: boolean
	telegram: boolean
	telephone: boolean
	theme?: {
		primaryColor?: string
		secondaryColor?: string
		accentColor?: string
	}
}

export const ContactDepartmentCard = ({ title, phone, whatsapp, telegram, telephone, theme }: DeptProps) => {
	const handleSaveContact = () => {
		quickSaveContact(title, phone)
	}

	return (
		<div className='dark:bg-card/40 dark:bg-card/40 relative flex w-full cursor-pointer flex-col rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/5'>
			<div className='flex items-center gap-4'>
				<div
					className='rounded-full p-3'
					style={{
						backgroundColor: `${theme?.primaryColor}30`,
						color: theme?.primaryColor
					}}>
					<Phone className='h-6 w-6' />
				</div>
				<div className='flex-1'>
					<h3 className='text-[18px] font-semibold text-slate-900 dark:text-white'>{title}</h3>
					<p className='mt-0.5 font-mono text-sm text-slate-500 dark:text-slate-400'>{phone}</p>
				</div>
			</div>

			<div className='mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-white/5'>
				<button
					onClick={handleSaveContact}
					className='flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'
					aria-label='Save to contacts'>
					<Save className='h-4 w-4' />
					Save Contact
				</button>

				<div className='flex gap-3'>
					{whatsapp && (
						<a
							href={`https://wa.me/${formatPhoneNumberSimple(phone)}`}
							target='_blank'
							rel='noopener noreferrer'
							className='rounded-lg bg-slate-100 p-1.5 text-slate-500 transition-colors hover:bg-green-100 hover:text-green-600 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-green-500/20 dark:hover:text-green-500'
							aria-label='Open WhatsApp'>
							<MessageCircle className='h-5 w-5' />
						</a>
					)}

					{telephone && (
						<a
							href={`tel:${phone}`}
							className='dark:hover:bg-primary/20 dark:hover:text-primary rounded-lg bg-slate-100 p-1.5 text-slate-500 transition-colors hover:bg-blue-100 hover:text-blue-600 dark:bg-white/5 dark:text-slate-400'
							aria-label='Call'>
							<Phone className='h-5 w-5' />
						</a>
					)}

					{telegram && (
						<a
							href={`https://t.me/${formatPhoneNumberSimple(phone)}`}
							target='_blank'
							rel='noopener noreferrer'
							className='rounded-lg bg-slate-100 p-1.5 text-slate-500 transition-colors hover:bg-sky-100 hover:text-sky-600 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-500'
							aria-label='Open Telegram'>
							<Send className='h-5 w-5' />
						</a>
					)}
				</div>
			</div>
		</div>
	)
}
