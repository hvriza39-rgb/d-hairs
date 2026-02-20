import ProductCard from "@/components/ProductCard";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Shop | D-Hairs",
    description: "Browse our premium collection of hair extensions and wigs.",
};

async function getProducts() {
    const h = await headers();
    const host = h.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    try {
        const res = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });
        if (!res.ok) return [];
        return res.json();
    } catch {
        return [];
    }
}

export default async function ShopPage() {
    const products = await getProducts();

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Our Collection
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl">
                        Explore our curated selection of top-tier human hair. Find your perfect match.
                    </p>
                </div>

                {/* Filters/Sorting */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-6 border-b border-gray-200">
                    <div className="flex space-x-2 mb-4 sm:mb-0 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                        <button className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full text-sm font-medium border border-pink-200 whitespace-nowrap">All Items</button>
                        <button className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-50 rounded-full text-sm font-medium border border-gray-200 transition-colors whitespace-nowrap">Wigs</button>
                        <button className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-50 rounded-full text-sm font-medium border border-gray-200 transition-colors whitespace-nowrap">Bundles</button>
                    </div>
                    <div className="w-full sm:w-auto">
                        <select className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-xl bg-white text-gray-700 border">
                            <option>Sort by: Newest</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Product Grid */}
                {products.length === 0 ? (
                    <div className="text-center py-24">
                        <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <p className="text-gray-500 text-lg font-medium">No products yet.</p>
                        <p className="text-gray-400 text-sm mt-1">Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}
