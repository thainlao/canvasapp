import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        async signIn({ user, account }: { user: any; account: any }) {
            const {name, email} = user
            if (account.provider === 'github') {
                try {
                    const res = await fetch(`${process.env.CLIENT_URL}/api/user`, 
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                name, email
                            })
                        });
                    if (res.ok) {
                        return true; // User registered successfully
                    }
                } catch (e) {
                    console.log(e)
                }
            }

            if (account.provider === 'google') {
                try {
                    const res = await fetch(`${process.env.CLIENT_URL}/api/user`, 
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                name, email
                            })
                        });
                    if (res.ok) {
                        return true; // User registered successfully
                    } else {
                        console.error('failer to register user', await res.json())
                    }
                } catch (e) {
                    console.error(e);
                }
            }
            return false;
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };