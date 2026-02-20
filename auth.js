import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const adminUsername = process.env.ADMIN_USERNAME;
                const adminPassword = process.env.ADMIN_PASSWORD;

                if (
                    credentials?.username === adminUsername &&
                    credentials?.password === adminPassword
                ) {
                    return { id: "1", name: "Admin", email: "admin@d-hairs.com" };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminRoute = nextUrl.pathname.startsWith("/admin");
            const isLoginPage = nextUrl.pathname === "/admin/login";

            if (isLoginPage) return true;
            if (isAdminRoute && !isLoggedIn) return false;
            return true;
        },
    },
});
