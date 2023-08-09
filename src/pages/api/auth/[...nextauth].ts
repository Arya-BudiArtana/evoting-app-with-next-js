import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                const { username, password } = credentials as any

                const res = await fetch('your own api', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password
                    }),
                })

                const user = await res.json();
                if (res.ok && user.success === true) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],

    callbacks:{
        async jwt({token, user}) {
            return {...token, ...user}
        },

        async session({session, token, user}) {
            session.user = token as any
            return session
        },

        // async redirect({ url, baseUrl }) {
        //     return baseUrl
        // },
    },

    pages: {
        signIn: "/authentication/login",
        signOut: "/authentication/login"
    }
}

export default NextAuth(authOptions)
