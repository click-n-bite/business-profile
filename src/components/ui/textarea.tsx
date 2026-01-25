import { cn } from "@/utils/cn"

export const Textarea = ({ className, autoFocus = false, ...props }: React.ComponentProps<"textarea">) => (
	<textarea
		data-slot='textarea'
		autoFocus={autoFocus}
		className={cn(
			"border-input placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full resize-none rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[0px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
			"text-[16px]",
			"text-base",
			"text-lg",
			"md:text-base",
			className
		)}
		{...props}
	/>
)
