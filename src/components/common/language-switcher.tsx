"use client"
import { useCallback, useEffect, useState } from "react"
import { Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface LanguageSwitcherProps {
	defaultLanguage?: string
}

export const LanguageSwitcher = ({ defaultLanguage = "en" }: LanguageSwitcherProps) => {
	const [currentLocale, setCurrentLocale] = useState<string>("en")

	useEffect(() => {
		const getClientLocale = () => {
			const match = document.cookie.match(/locale=(\w+)/)

			return match ? match[1] : defaultLanguage
		}

		setCurrentLocale(getClientLocale())
	}, [defaultLanguage])

	const onSelectChange = useCallback((locale: string) => {
		document.cookie = `locale=${locale}; path=/; max-age=31536000; SameSite=Lax`
		setCurrentLocale(locale)
		window.location.reload()
	}, [])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon'>
					<Globe />
					<span className='sr-only'>Switch language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='space-y-1'>
				{locales.map(({ code, flag, label }) => (
					<DropdownMenuItem
						key={code}
						data-active={code === currentLocale}
						onClick={() => onSelectChange(code)}
						className='text-muted-foreground data-[active=true]:text-foreground flex cursor-pointer items-center justify-between gap-2 data-[active=true]:cursor-default data-[active=true]:bg-purple-200/60 data-[active=true]:font-bold'>
						<span className='flex items-center gap-2'>
							<span className='w-5 text-center'>{flag}</span>
							<span>{label}</span>
						</span>

						{code === currentLocale && <Check className='size-4 text-purple-500' />}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

const locales = [
	{ code: "en", flag: "🇺🇸", label: "English" },
	{ code: "ar", flag: "🇸🇦", label: "العربية" }
]
