import { ROUTES } from "@/next.routes"
import { Media } from "@payload-types"
import { Globe, Palette, PhoneCall, Layers, MapPin, Smartphone } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

export const features = [
	{
		icon: Palette,
		title: "items.themes.title",
		description: "items.themes.description",
		prominent: true,
		gradient: "from-white to-blue-50 dark:from-gray-800 dark:to-blue-950/20",
		border: "border-blue-200 dark:border-blue-800",
		iconColor: "text-blue-600 dark:text-blue-400"
	},
	{
		icon: PhoneCall,
		title: "items.contact.title",
		description: "items.contact.description",
		prominent: false,
		gradient: "from-white to-emerald-50 dark:from-gray-800 dark:to-emerald-950/20",
		border: "border-emerald-200 dark:border-emerald-800",
		iconColor: "text-emerald-600 dark:text-emerald-400"
	},
	{
		icon: Layers,
		title: "items.dynamicData.title",
		description: "items.dynamicData.description",
		prominent: false,
		gradient: "from-white to-orange-50 dark:from-gray-800 dark:to-orange-950/20",
		border: "border-orange-200 dark:border-orange-800",
		iconColor: "text-orange-600 dark:text-orange-400"
	},
	{
		icon: MapPin,
		title: "items.interactiveLocations.title",
		description: "items.interactiveLocations.description",
		prominent: false,
		gradient: "from-white to-pink-50 dark:from-gray-800 dark:to-pink-950/20",
		border: "border-pink-200 dark:border-pink-800",
		iconColor: "text-pink-600 dark:text-pink-400"
	},
	{
		icon: Globe,
		title: "items.multiLanguageSupport.title",
		description: "items.multiLanguageSupport.description",
		prominent: false,
		gradient: "from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-950/20",
		border: "border-indigo-200 dark:border-indigo-800",
		iconColor: "text-indigo-600 dark:text-indigo-400"
	},
	{
		icon: Smartphone,
		title: "items.247PrioritySupport.title",
		description: "items.247PrioritySupport.description",
		prominent: false,
		gradient: "from-white to-teal-50 dark:from-gray-800 dark:to-teal-950/20",
		border: "border-teal-200 dark:border-teal-800",
		iconColor: "text-teal-600 dark:text-teal-400"
	}
]

export const testimonials = [
	{
		name: "first.name",
		role: "first.role",
		content: "first.content",
		rating: 5,
		avatar: "first.avatar"
	},
	{
		name: "second.name",
		role: "second.role",
		content: "second.content",
		rating: 5,
		avatar: "second.avatar"
	},
	{
		name: "third.name",
		role: "third.role",
		content: "third.content",
		rating: 5,
		avatar: "third.avatar"
	},
	{
		name: "fourth.name",
		role: "fourth.role",
		content: "fourth.content",
		rating: 5,
		avatar: "fourth.avatar"
	},
	{
		name: "fifth.name",
		role: "fifth.role",
		content: "fifth.content",
		rating: 5,
		avatar: "fifth.avatar"
	},
	{
		name: "sixth.name",
		role: "sixth.role",
		content: "sixth.content",
		rating: 5,
		avatar: "sixth.avatar"
	}
]

export const clientLogos: Media[] = [
	{
		url: "/landing/logos/air-cafe.avif",
		alt: "Air Cafe",
		updatedAt: new Date().toISOString(),
		createdAt: new Date().toISOString(),
		id: uuidv4(),
		filename: "air-cafe.avif",
		width: 185.6,
		height: 185.6
	},
	{
		url: "/landing/logos/delice.avif",
		alt: "Delice",
		updatedAt: new Date().toISOString(),
		createdAt: new Date().toISOString(),
		id: uuidv4(),
		filename: "delice.avif",
		width: 185.6,
		height: 185.6
	},
	{
		url: "/landing/logos/kaliz-burger.avif",
		alt: "Kaliz Burger",
		updatedAt: new Date().toISOString(),
		createdAt: new Date().toISOString(),
		id: uuidv4(),
		filename: "kaliz-burger.avif",
		width: 185.6,
		height: 185.6
	},
	{
		url: "/landing/logos/orientable.avif",
		alt: "Orientable",
		updatedAt: new Date().toISOString(),
		createdAt: new Date().toISOString(),
		id: uuidv4(),
		filename: "orientable.avif",
		width: 185.6,
		height: 185.6
	},
	{
		url: "/landing/logos/sunday-rooftop.avif",
		alt: "Sunday Rooftop",
		updatedAt: new Date().toISOString(),
		createdAt: new Date().toISOString(),
		id: uuidv4(),
		filename: "sunday-rooftop.avif",
		width: 185.6,
		height: 185.6
	}
]

export const pricingPlanFeatures = [
	"plan.features.first",
	"plan.features.second",
	"plan.features.third",
	"plan.features.fourth",
	"plan.features.fifth",
	"plan.features.sixth",
	"plan.features.seventh",
	"plan.features.eighth",
	"plan.features.ninth",
	"plan.features.tenth",
	"plan.features.eleventh",
	"plan.features.twelfth"
]

export const contactInfo = {
	email: "support@clicknbite.com",
	address: "address",
	phone: "+961 71 113 255",
	poweredBy: "https://socialcube.ai"
}

export const navLinks = [
	{
		label: "navLinks.features",
		href: ROUTES.FEATURES
	},
	{
		label: "navLinks.pricing",
		href: ROUTES.PRICING
	},
	{
		label: "navLinks.testimonials",
		href: ROUTES.TESTIMONIALS
	}
]

export const legalLinks = [
	{
		label: "legalLinks.privacy",
		href: ROUTES.PRIVACY
	},
	{
		label: "legalLinks.terms",
		href: ROUTES.TERMS
	},
	{
		label: "legalLinks.cookies",
		href: ROUTES.COOKIES
	}
]
