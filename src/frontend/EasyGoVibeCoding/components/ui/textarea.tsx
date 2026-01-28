import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-16 w-full rounded-lg border-2 px-3 py-2 text-base shadow-sm transition-all duration-200 outline-none md:text-sm',
        'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600',
        'text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400',
        'hover:border-gray-400 dark:hover:border-gray-500',
        'focus-visible:border-blue-500 dark:focus-visible:border-blue-400 focus-visible:ring-4 focus-visible:ring-blue-500/20 dark:focus-visible:ring-blue-400/20',
        'aria-invalid:border-red-500 aria-invalid:ring-4 aria-invalid:ring-red-500/20',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-900',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
