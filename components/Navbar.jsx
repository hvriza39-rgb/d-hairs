"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/hairstore-logo.png"
                                    alt="D-Hairs logo"
                                    width={160}
                                    height={56}
                                    className="object-contain"
                                    priority
                                />
                            </Link>
                        </div>
                        <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                            <Link href="/" className="text-gray-700 hover:text-pink-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-pink-600 text-sm font-medium transition-colors">
                                Home
                            </Link>
                            <Link href="/shop" className="text-gray-700 hover:text-pink-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-pink-600 text-sm font-medium transition-colors">
                                Shop
                            </Link>
                        </div>
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link href="/" className="bg-pink-50 border-pink-500 text-pink-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                            Home
                        </Link>
                        <Link href="/shop" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                            Shop
                        </Link>

                    </div>
                </div>
            )}
        </nav>
    );
}
