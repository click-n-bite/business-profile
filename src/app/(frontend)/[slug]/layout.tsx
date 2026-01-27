import { TenantFooter } from "@/components/tenant/tenant-footer"
import { TenantHeader } from "@/components/tenant/tenant-header"
import { TenantTheme } from "@/components/tenant/tenant-theme"
import { fetchTenantData } from "@/sections/service"

interface TenantLayoutProps {
	children: React.ReactNode
	params: {
		slug: string
	}
}

export default async function TenantLayout({ children, params }: TenantLayoutProps) {
	const { slug } = params

	const data = await fetchTenantData(slug)

	const theme = data.businessThemes

	console.log("theme", theme)

	return (
		<>
			<TenantTheme theme={theme} />
			<main className='relative flex min-h-screen flex-col'>
				<TenantHeader />
				<div className='flex-1 pt-[68px] md:pt-[100px]'>{children}</div>
				<TenantFooter />
			</main>
		</>
	)
}
