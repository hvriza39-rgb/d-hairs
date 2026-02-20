"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
    const pathname = usePathname();

    const navItems = [
        {
            name: "Dashboard", href: "/admin", icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            )
        },
        {
            name: "Products", href: "/admin/products", icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            )
        },
        {
            name: "Add Product", href: "/admin/add-product", icon: (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            )
        }
    ];

    return (
        <div className="w-64 bg-white shadow-sm border-r border-gray-100 min-h-[calc(100vh-4rem)] hidden md:block">
            <div className="pt-8 pb-4 px-6 border-b border-gray-100">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Store Admin</h2>
            </div>
            <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${isActive
                                ? "bg-pink-50 text-pink-700 pointer-events-none"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <div className={isActive ? "text-pink-600" : "text-gray-400"}>
                                {item.icon}
                            </div>
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="absolute bottom-0 w-64 p-4 border-t border-gray-100 bg-white space-y-1">
                <Link
                    href="/"
                    className="flex items-center px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-50 transition-colors"
                >
                    <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Store
                </Link>
                <button
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-500 hover:text-red-700 rounded-xl hover:bg-red-50 transition-colors"
                >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    Sign Out
                </button>
            </div>
        </div>
    );
}
