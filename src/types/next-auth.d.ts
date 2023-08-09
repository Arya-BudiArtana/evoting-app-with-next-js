import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session{
        user: {
            success: boolean
            http_status: number
            data: String
        }
    }
}
