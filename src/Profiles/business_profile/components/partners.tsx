import { BusinessPartner } from "@payload-types"
import Image from "next/image"

interface PartnerCardProps {
	name: BusinessPartner["name"]
	logo: BusinessPartner["logo"]
}

export const PartnerCard = ({ name, logo }: PartnerCardProps) => {
	if (!logo || typeof logo === "string") return null

	return (
		<div className='group flex flex-shrink-0 flex-col items-center gap-3 pb-2'>
			<div className='relative flex h-30 w-40 items-center justify-center rounded-2xl bg-white p-4 shadow-sm backdrop-blur-sm transition-all dark:bg-white/5'>
				<Image src={logo.url || ""} alt={logo.alt} fill className='rounded-2xl object-fill' />
			</div>

			<span className='text-gary-700 text-sm font-bold tracking-widest uppercase transition-colors dark:text-white'>
				{name}
			</span>
		</div>
	)
}
