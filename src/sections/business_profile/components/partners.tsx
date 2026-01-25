import { BusinessPartner } from "@payload-types"
import Image from "next/image"

interface PartnerCardProps {
	name: BusinessPartner["name"]
	logo: BusinessPartner["logo"]
}

export const PartnerCard = ({ name, logo }: PartnerCardProps) => {
	if (!logo || typeof logo === "string") return null

	return (
		<div className='group flex flex-shrink-0 flex-col items-center gap-3'>
			<div className='relative flex h-30 w-40 items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm backdrop-blur-sm transition-all dark:border-white/10 dark:bg-white/5'>
				<Image src={logo.url || ""} alt={logo.alt || name} fill className='rounded-2xl object-cover' />
			</div>

			<span className='text-[14px] font-bold tracking-widest text-white uppercase transition-colors group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-white'>
				{name}
			</span>
		</div>
	)
}
