import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div className="p-8">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
                    <p className="mt-2 text-gray-500 text-sm">Welcome back to your store admin panel.</p>
                </div>
                <Link
                    href="/admin/add-product"
                    className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-colors flex items-center shadow-pink-600/20"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    New Product
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-16 h-16 text-pink-600" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium mb-1">Total Products</h3>
                    <p className="text-4xl font-bold text-gray-900">4</p>
                    <div className="mt-4 flex items-center text-sm text-green-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        <span>Active listings</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-16 h-16 text-pink-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium mb-1">Total Categories</h3>
                    <p className="text-4xl font-bold text-gray-900">2</p>
                    <div className="mt-4 flex items-center text-sm text-gray-400">
                        <span>Wigs & Bundles</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">Recent Products</h3>
                    <Link href="/admin/products" className="text-sm font-medium text-pink-600 hover:text-pink-700">View all</Link>
                </div>
                <div className="divide-y divide-gray-100">
                    {/* Mock product row */}
                    <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg mr-4 border border-gray-200 overflow-hidden">
                                {/* Placeholder image */}
                                <div className="w-full h-full bg-pink-100" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Bone Straight 24 inches</h4>
                                <p className="text-sm text-gray-500">₦150,000</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="text-gray-400 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors">Edit</button>
                            <button className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
