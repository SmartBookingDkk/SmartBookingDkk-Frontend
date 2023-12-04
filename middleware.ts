// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        // console.log(request.nextUrl.pathname)
        // console.log(request.nextauth.token)

        // If the user does not have a valid token, redirect them to /entry
        if (!request.nextauth.token) {
            return NextResponse.rewrite(
                new URL("/", request.url)
            )
        }

        // If the user has a valid token and is trying to access /entry, let them proceed
        if (request.nextUrl.pathname.startsWith("/") && request.nextauth.token) {
            return NextResponse.rewrite(
                new URL("/", request.url)
            );
        } else if (request.nextUrl.pathname.startsWith("/") && !request.nextauth.token) {
            return NextResponse.next();
        }

        // // For all other cases, redirect them to /access-denied
        // return NextResponse.rewrite(
        //     new URL("/access-denied", request.url)
        // )
    },
    {
        secret: process.env.NEXTAUTH_SECRET
    }
)

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}