import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'h-9 w-full min-w-0 rounded-lg border-2 px-3 py-1 text-base shadow-sm transition-all duration-200 outline-none md:text-sm',
        'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600',
        'text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400',
        'hover:border-gray-400 dark:hover:border-gray-500',
        'focus-visible:border-blue-500 dark:focus-visible:border-blue-400 focus-visible:ring-4 focus-visible:ring-blue-500/20 dark:focus-visible:ring-blue-400/20',
        'aria-invalid:border-red-500 aria-invalid:ring-4 aria-invalid:ring-red-500/20',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-900',
        'selection:bg-purple-500 selection:text-white',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-900 dark:file:text-gray-100',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
