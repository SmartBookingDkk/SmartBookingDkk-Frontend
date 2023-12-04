import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { GoogleProfile } from 'next-auth/providers/google';
import GoogleProvider from "next-auth/providers/google";
import { AppleProfile } from 'next-auth/providers/apple';
import AppleProvider from "next-auth/providers/apple";
import { AuthProvider, Role, User } from '@/types/User';

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            profile(profile: GoogleProfile) {
                console.log(profile);
                return {
                    ...profile,
                    id: profile.sub,
                    role: "",
                    email: profile.email ?? "",
                    image: profile.picture ?? "",
                    provider: AuthProvider.GOOGLE,
                };
            },
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        }),
        AppleProvider({
            profile(profile: AppleProfile) {
                console.log(profile);
                return {
                    ...profile,
                    id: profile.sub,
                    email: profile.email ?? "",
                    role: "",
                    provider: AuthProvider.APPLE,
                };
            },
            clientId: process.env.APPLE_CLIENT_ID ?? "",
            clientSecret: process.env.APPLE_CLIENT_SECRET ?? ""
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Username:",
                    type: "text",
                    placeholder: "john Doe"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "********"
                }
            },
            async authorize(credentials) {
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                const user = {
                    id: "some-id", // Add this line
                    email: "",
                    password: "",
                    role: "",
                }

                if (credentials?.email === user.email && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {

        async signIn({ user, account, profile}) {
            if (profile?.email) {
                user.email = profile.email;

                const entityUser: User = {
                   email: user.email,
                   provider: account?.provider.toUpperCase() as AuthProvider,
                   active: true,
                   roles: [Role.USER]
                };
                
                console.log("THIS IS ENTITYUSER", entityUser);
                
                fetch(process.env.NEXT_PUBLIC_CREATE_USER ?? "", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(entityUser),
                  })
                    .then(response => {
                      if (!response.ok) {
                        console.log(response);
                        throw new Error(`HTTP error! Status: ${response.status}`);
                      }
                      return response.json(); // Assuming response is JSON, adjust if needed
                    })
                    .then(data => {
                      // Handle successful response
                      console.log('Success:', data);
                    })
                    .catch(error => {
                      // Handle error
                      console.error('Error:', error);
                    });
                
            }
            return true;
        },


        // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
        async jwt({ token, user }) {
            // This callback is called whenever a JWT is created or updated.

            // If the user just logged in or registered, add their role to the JWT.
            if (user) {
                //token.role = await determineUserRole(user.email);   // Method which fetches user role from database
            }

            return token;
        },
        // If you want to use the role in client components
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}