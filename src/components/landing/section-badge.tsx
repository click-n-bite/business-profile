import { cn } from "@/utils/cn"
import { cva, VariantProps } from "class-variance-authority"
import { LucideIcon } from "lucide-react"

interface SectionBadgeProps extends VariantProps<typeof badgeVariants> {
	icon: LucideIcon
	children: React.ReactNode
	className?: string
}

const badgeVariants = cva("mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm", {
	variants: {
		variant: {
			gradient:
				"border-blue-200 text-blue-700 " +
				"bg-blue-50/60 " +
				"dark:border-blue-800 dark:text-cyan-300 dark:bg-blue-900/20",

			secondary:
				"border-slate-200 text-slate-700 bg-white " + "dark:border-slate-700 dark:text-slate-300 dark:bg-slate-900/40"
		}
	},
	defaultVariants: {
		variant: "gradient"
	}
})

export const SectionBadge = ({ icon: Icon, children, className, variant }: SectionBadgeProps) => (
	<div className={cn(badgeVariants({ variant }), className)}>
		<Icon className='size-4 text-blue-600 dark:text-cyan-400' />
		<span className='text-sm font-medium'>{children}</span>
	</div>
)
