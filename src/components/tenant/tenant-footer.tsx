"use client"

import { DevelopedBy } from "../common/developed-by"

export const TenantFooter = () => {
	return (
		<footer className='border-border border-t bg-white py-5 dark:bg-black'>
			<div className='flex-center flex-col gap-4'>
				<DevelopedBy />
			</div>
		</footer>
	)
}
