"use client"

import { ContactDepartment } from "@/Profiles/types"
import { formatPhoneNumberSimple } from "@/utils/contact-utils"
import { Phone } from "lucide-react"
import Image from "next/image"

interface Props extends ContactDepartment {
	onSaveContact: (name: string, phone: string) => void
}

export const ContactDepartmentCard = ({ title, phone, whatsapp, telegram, telephone, sms, onSaveContact }: Props) => {
	const handleSaveContact = () => {
		onSaveContact(title, phone)
	}

	return (
		<div className='dark:bg-card/40 dark:bg-card/40 relative mb-4 flex w-full cursor-pointer flex-col rounded-xl border border-slate-200 bg-slate-100 bg-white p-4 text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/5 dark:bg-white/5 dark:text-white'>
			<div className='flex items-center gap-4'>
				<div className='rounded-lg bg-[#e9e9e9] p-3 dark:bg-[#191919]'>
					<Phone className='h-5 w-5' />
				</div>
				<div className='flex-1'>
					<h3 className='text-md font-semibold text-slate-900 dark:text-white'>{title}</h3>
					<p className='mt-0.5 font-mono text-sm text-slate-500 dark:text-slate-400'>{phone}</p>
				</div>
			</div>

			<div className='mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-white/5'>
				<div className='flex gap-2'>
					{sms && (
						<a
							href={`sms:${phone}`}
							className='flex items-center justify-center rounded-lg bg-slate-100 p-2 text-slate-500 transition-colors hover:bg-blue-100 hover:text-blue-600 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-blue-500/20 dark:hover:text-blue-500'
							aria-label='Send SMS message'>
							<Image src='/images/sms.png' alt='SMS' width={20} height={20} className='h-5 w-5' />
						</a>
					)}

					{whatsapp && (
						<a
							href={`https://wa.me/${formatPhoneNumberSimple(phone)}`}
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center justify-center rounded-lg bg-slate-100 p-2 text-slate-500 transition-colors hover:bg-green-100 hover:text-green-600 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-green-500/20 dark:hover:text-green-500'
							aria-label='Open WhatsApp'>
							<Image src='/images/whatsapp.png' alt='WhatsApp' width={20} height={20} className='h-5 w-5' />
						</a>
					)}

					{telegram && (
						<a
							href={`https://t.me/${formatPhoneNumberSimple(phone)}`}
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center justify-center rounded-lg bg-slate-100 p-2 text-slate-500 transition-colors hover:bg-sky-100 hover:text-sky-600 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-500'
							aria-label='Open Telegram'>
							<Image src='/images/telegram.png' alt='Telegram' width={20} height={20} className='h-5 w-5' />
						</a>
					)}
				</div>
				<div className='flex gap-2'>
					<button
						onClick={handleSaveContact}
						className='flex cursor-pointer items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'
						aria-label='Save to contacts'>
						<Image src='/images/bookmark.png' alt='Save' width={20} height={20} className='h-5 w-5' />
					</button>

					{telephone && (
						<a
							href={`tel:${phone}`}
							className='flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-yellow-100 hover:text-green-600 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-yellow-500/20 dark:hover:text-green-400'
							aria-label='Call'>
							<Image src='/images/phone-call.png' alt='Call' width={20} height={20} className='h-5 w-5' />
						</a>
					)}
				</div>
			</div>
		</div>
	)
}
