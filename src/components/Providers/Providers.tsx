'use client'

import { Auth0Provider } from '@auth0/auth0-react';
import { NextUIProvider } from '@nextui-org/react'

// Contexts
import { ResponsiveProvider } from '@/contexts/MediaQueryContext'



export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Auth0Provider
            domain={`${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}`}
            clientId={`${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}`}
            authorizationParams={{
                redirect_uri: "http://localhost:3000/dashboard"
            }}
        >
            <NextUIProvider>
                <ResponsiveProvider>
                    {children}
                </ResponsiveProvider>
            </NextUIProvider>
        </Auth0Provider>
    )
}