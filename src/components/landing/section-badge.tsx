import { cn } from "@/utils/cn"
import { cva, VariantProps } from "class-variance-authority"
import { LucideIcon } from "lucide-react"

interface SectionBadgeProps extends VariantProps<typeof badgeVariants> {
	icon: LucideIcon
	children: React.ReactNode
	className?: string
}

const badgeVariants = cva("mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2", {
	variants: {
		variant: {
			gradient:
				"text-emerald-700 dark:text-emerald-300 border-emerald-700 dark:border-emerald-700 " + "dark:bg-transparent ",

			orange:
				"bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-900"
		}
	},
	defaultVariants: {
		variant: "gradient"
	}
})

export const SectionBadge = ({ icon: Icon, children, className, variant }: SectionBadgeProps) => (
	<div className={cn(badgeVariants({ variant }), className)}>
		<Icon className='size-4 text-emerald-600 dark:text-emerald-400' />
		<span className='text-sm font-medium'>{children}</span>
	</div>
)
