import { BusinessLayout } from "@/sections/business_profile/business_layout"
import { PersonalPortfolioLayout } from "@/sections/personal_profile/personal_layout"
import { fetchTenantData } from "@/sections/service"

interface PageProps {
	params: Promise<{ slug: string }>
}

export default async function TenantPage({ params }: PageProps) {
	const { slug } = await params

	const data = await fetchTenantData(slug)

	const theme = {
		primaryColor: data.businessThemes?.primaryColor || "",
		secondaryColor: data.businessThemes?.secondaryColor || "",
		accentColor: data.businessThemes?.accentColor || ""
	}

	const isPersonalTheme = data.businessThemes?.themeType === "personal"

	if (isPersonalTheme) {
		return <PersonalPortfolioLayout data={data} theme={theme} />
	}

	return <BusinessLayout data={data} theme={theme} />
}
