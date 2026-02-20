import { LanguageSwitcher } from "../common/language-switcher"
import { ThemeSwitcher } from "../common/theme-switcher"

interface TenantHeaderProps {
	defaultLanguage: string
}

export const TenantHeader = async ({ defaultLanguage }: TenantHeaderProps) => {
	return (
		<header className='fixed top-0 right-0 left-0 z-50 w-full bg-white dark:bg-black'>
			<div className='custom-container flex items-center justify-end py-4 md:h-[55px]'>
				<div className='flex items-center gap-2.5'>
					<ThemeSwitcher />
					<LanguageSwitcher defaultLanguage={defaultLanguage} />
				</div>
			</div>
		</header>
	)
}
