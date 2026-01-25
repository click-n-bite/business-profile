"use client"

import { LanguageSwitcher } from "../common/language-switcher"
import { ThemeSwitcher } from "../common/theme-switcher"

export const TenantHeader = () => {
	return (
		<header className='fixed top-0 right-0 left-0 z-50 w-full bg-white dark:bg-black'>
			<div className='custom-container flex items-center justify-end py-4 md:h-[55px]'>
				<div className='flex items-center gap-2.5'>
					<ThemeSwitcher />
					<LanguageSwitcher />
				</div>
			</div>
		</header>
	)
}
