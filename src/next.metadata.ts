import type { Metadata, Viewport } from "next"
import { env } from "./constants/env-variables"

const baseUrl = env.NEXT_PUBLIC_SERVER_URL

export const metadata: Metadata = {
	title: "My Digital ID | Your Professional Digital Presence",
	description:
		"Create your personalized digital business card with My Digital ID. Showcase your social profiles, services, partners, and contact information in one beautiful, shareable link.",
	metadataBase: new URL(baseUrl),
	keywords: [
		"digital business card",
		"link in bio",
		"digital profile",
		"professional portfolio",
		"contact sharing",
		"social media links",
		"business networking",
		"digital identity",
		"online presence",
		"QR code business card",
		"virtual contact card",
		"whatsapp contact",
		"telegram contact",
		"save contact",
		"services showcase",
		"partners network"
	],
	authors: [{ name: "My Digital ID" }],
	creator: "My Digital ID",
	publisher: "My Digital ID",

	openGraph: {
		type: "website",
		locale: "en_US",
		url: baseUrl,
		title: "My Digital ID | Your Professional Digital Presence",
		description:
			"Create your personalized digital business card. Share your contact, services, and social links in one beautiful profile.",
		siteName: "My Digital ID",
		images: [
			{
				url: `${baseUrl}/og-image.png`,
				width: 1200,
				height: 630,
				alt: "My Digital ID - Professional Digital Profiles"
			}
		]
	},

	twitter: {
		card: "summary_large_image",
		title: "My Digital ID | Your Professional Digital Presence",
		description:
			"Create your personalized digital business card. Share your contact, services, and social links in one beautiful profile.",
		images: [`${baseUrl}/twitter-image.png`],
		creator: "@mydigitalid"
	},

	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1
		}
	},

	manifest: "/manifest.json",
	icons: {
		icon: [
			{ url: "/favicon.ico" },
			{ url: "/favicon.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon.png", sizes: "32x32", type: "image/png" }
		],
		apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
		other: [
			{
				rel: "mask-icon",
				url: "/safari-pinned-tab.svg",
				color: "#2563EB"
			}
		]
	}
}

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#2563EB" },
		{ media: "(prefers-color-scheme: dark)", color: "#1E40AF" }
	],
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	viewportFit: "cover",
	colorScheme: "light dark"
}
