import { BusinessLayout } from "@/Profiles/business_profile/business_layout"
import { PersonalPortfolioLayout } from "@/Profiles/personal_profile/personal_layout"
import { fetchTenantData } from "@/Profiles/service"

interface PageProps {
	params: Promise<{ slug: string }>
}

export default async function TenantPage({ params }: PageProps) {
	const { slug } = await params

	const data = await fetchTenantData(slug)

	console.log("data", data)

	const theme = {
		primaryColor: data.businessThemes?.primaryColor || "",
		secondaryColor: data.businessThemes?.secondaryColor || ""
	}

	const isPersonalTheme = data.businessThemes?.themeType === "personal"

	if (isPersonalTheme) {
		return <PersonalPortfolioLayout data={data} theme={theme} />
	}

	return <BusinessLayout data={data} theme={theme} />
}
