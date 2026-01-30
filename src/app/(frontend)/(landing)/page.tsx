import { CtaSection } from "@/components/landing/cta-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { HeroSection } from "@/components/landing/hero-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { TestimonialsSection } from "@/components/landing/testimonials/testimonials-section"

export default function LandingPage() {
	return (
		<>
			<HeroSection />
			<FeaturesSection />
			<TestimonialsSection />
			<PricingSection />
			<CtaSection />
		</>
	)
}
