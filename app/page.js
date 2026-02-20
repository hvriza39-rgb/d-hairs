import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-50 to-white pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
              Flawless Hair, <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-700">Every Day.</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 mb-10 leading-relaxed">
              Discover our premium collection of 100% human hair wigs, bundles, and frontal closures. Unmatched quality, directly to you.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/shop"
                className="px-8 py-4 text-lg font-medium rounded-full text-white bg-pink-600 hover:bg-pink-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                Shop Collection
              </Link>
              <Link
                href="/shop?category=new"
                className="px-8 py-4 text-lg font-medium rounded-full text-pink-700 bg-pink-50 hover:bg-pink-100 transition-all duration-300 border border-pink-200"
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6 rounded-2xl hover:bg-pink-50 transition-colors duration-300">
              <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-gray-600">100% virgin human hair that lasts longer and looks naturally flawless.</p>
            </div>
            <div className="text-center p-6 rounded-2xl hover:bg-pink-50 transition-colors duration-300">
              <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Quick processing and shipping nationwide so you never have to wait.</p>
            </div>
            <div className="text-center p-6 rounded-2xl hover:bg-pink-50 transition-colors duration-300">
              <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Easy Orders</h3>
              <p className="text-gray-600">Direct ordering via WhatsApp for a personalized shopping experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
