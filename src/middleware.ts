export {default} from "next-auth/middleware"
export const config = { matcher: ["/", "/utilities/:path*", "/icons", "/sample-page"] }