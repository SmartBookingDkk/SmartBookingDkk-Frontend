'use client'

import { NextUIProvider } from '@nextui-org/react'

// Contexts
import { ResponsiveProvider } from '@/contexts/MediaQueryContext'


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ResponsiveProvider>
        {children}
      </ResponsiveProvider>
    </NextUIProvider>
  )
}