import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isLoginPage = req.nextUrl.pathname === "/admin/login";

    if (isLoginPage) return NextResponse.next();

    if (isAdminRoute && !isLoggedIn) {
        const loginUrl = new URL("/admin/login", req.nextUrl.origin);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/admin/:path*"],
};
