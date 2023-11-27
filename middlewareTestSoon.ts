"use server";
import { NextResponse, NextRequest } from 'next/server';
import { parse } from "cookie";

const BACKEND_URL = `http://usermngmt-svc:90/api/session`;

/**
 * Middleware function that verifies if the user session is valid.
 * If the session is not valid, it redirects the user to the login page.
 * If the session is valid, it continues processing the request.
 * @param req - The NextRequest object representing the incoming request.
 * @returns A NextResponse object representing the response to be sent to the client.
 */
export async function verifySession(req: NextRequest) {
    if (!req.nextUrl.pathname.startsWith('/login')) {
        console.log(req.nextUrl.pathname);

        const cookies = parse(req.headers.get('Cookie') || '');
        const sessionCookie = cookies['connect.sid'];

        console.log('Received cookie:', sessionCookie);

        if (!sessionCookie) {
            console.log('No cookie found.');
            return redirectToLogin(req);
        }

       
        try {
            const res = await fetch(BACKEND_URL, {
                headers: {
                    'Cookie': `connect.sid=${sessionCookie}`
                },
                credentials: 'include',
            });

            // If the microservice doesn't return a 200 status code, consider the session invalid.
            if (res.status !== 200) {
                console.log('Session validation failed with status:', res.status);
                return redirectToLogin(req);
            }

            const sessionData = await res.json();

            if (sessionData && sessionData.authenticated) {
                console.log('Session is valid for user:', sessionData);
                return; // Continue processing the request
            } else {
                console.log('Session is not valid.');
                return redirectToLogin(req);
            }

        } catch (error) {
            console.error("Error verifying session:", error);
            return redirectToLogin(req);
        }
    }
}

// Centralized function to handle unauthenticated users
const redirectToLogin = (req: NextRequest) => {
    console.log("redirecting to login...");
    return NextResponse.rewrite(new URL('/login', req.url));
};

export const config = {
    matcher: [
        '/', '/chatbot/:path*', '/audio-generator/:path*',
        '/education-feedback/:path*', '/entry/:path*', '/new-chat/:path*',
        '/pagelist/:path*', '/code-generator/:path*', '/photo-editor/:path*',
        '/pricing-and-payment/:path*', '/settings/:path*', '/share/:path*',
        '/social/:path*', '/statistics/:path*', '/video-generation/:path*',
    ],
}

export default verifySession;
