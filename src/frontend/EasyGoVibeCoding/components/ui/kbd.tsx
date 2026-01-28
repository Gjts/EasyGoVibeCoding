import { cn } from '@/lib/utils'

function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'bg-gray-200 dark:bg-gray-700 w-fit text-gray-900 dark:text-gray-100 pointer-events-none inline-flex h-5 min-w-5 items-center justify-center gap-1 rounded-md px-1.5 font-sans text-xs font-semibold select-none border border-gray-300 dark:border-gray-600 shadow-sm',
        "[&_svg:not([class*='size-'])]:size-3",
        '[[data-slot=tooltip-content]_&]:bg-white/90 [[data-slot=tooltip-content]_&]:text-gray-900 dark:[[data-slot=tooltip-content]_&]:bg-gray-800/90 dark:[[data-slot=tooltip-content]_&]:text-gray-100',
        className,
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn('inline-flex items-center gap-1', className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
