import Link from "next/link";
import { getProducts } from "@/services/productService";

export const metadata = {
    title: "Products | Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
    const products = await getProducts();

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
        }).format(price);

    return (
        <div className="p-8">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">All Products</h1>
                    <p className="mt-1 text-sm text-gray-500">{products.length} product{products.length !== 1 ? "s" : ""} in your store</p>
                </div>
                <Link
                    href="/admin/add-product"
                    className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-colors flex items-center shadow-pink-600/20"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Product
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No products yet</h3>
                    <p className="text-gray-500 text-sm mb-6">Get started by adding your first product.</p>
                    <Link href="/admin/add-product" className="inline-flex items-center px-5 py-2.5 bg-pink-600 text-white rounded-xl text-sm font-medium hover:bg-pink-700 transition-colors">
                        Add your first product
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Added</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                                            {product.imageUrl && (
                                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                                            <p className="text-xs text-gray-400 line-clamp-1 max-w-xs">{product.description}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-pink-600">{formatPrice(product.price)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(product.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/product/${product.id}`}
                                                className="text-xs text-gray-500 hover:text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                                                target="_blank"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={`/admin/edit/${product.id}`}
                                                className="text-xs text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
