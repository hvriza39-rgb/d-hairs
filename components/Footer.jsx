import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-50 mt-12 border-t border-gray-200">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <span className="text-2xl font-bold tracking-tight text-gray-900">
                            D-HAIRS
                        </span>
                        <p className="text-gray-500 text-base">
                            Premium quality hair extensions and wigs delivered straight to your door.
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Shop</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link href="/shop" className="text-base text-gray-500 hover:text-gray-900">
                                            All Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/shop?category=wigs" className="text-base text-gray-500 hover:text-gray-900">
                                            Wigs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/shop?category=bundles" className="text-base text-gray-500 hover:text-gray-900">
                                            Bundles
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            Contact Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            Delivery Info
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            Returns
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <p className="text-base text-gray-400 xl:text-center">
                        &copy; {new Date().getFullYear()} D-Hairs. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
