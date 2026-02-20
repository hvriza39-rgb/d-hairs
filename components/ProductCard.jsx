import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
    // Format price to Naira
    const formattedPrice = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0,
    }).format(product.price);

    const whatsappMessage = `Hello, I want to order ${product.name} for ${formattedPrice}`;
    // 2348012345678 is a placeholder phone number. User needs to replace it.
    const whatsappUrl = `https://wa.me/2348012345678?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
            <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-100">
                <Image
                    src={product.imageUrl || "https://images.unsplash.com/photo-1519714859231-01646270b205?q=80&w=600&auto=format&fit=crop"} // Placeholder if no image
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </Link>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <Link href={`/product/${product.id}`}>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight hover:text-pink-600 transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                    <span className="text-lg font-extrabold text-pink-600 whitespace-nowrap ml-3">
                        {formattedPrice}
                    </span>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
                    {product.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                    <Link
                        href={`/product/${product.id}`}
                        className="text-center px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors text-sm"
                    >
                        Details
                    </Link>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-medium hover:bg-[#128C7E] transition-colors shadow-sm shadow-[#25D366]/20 text-sm flex items-center justify-center gap-1.5"
                    >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                        Order
                    </a>
                </div>
            </div>
        </div>
    );
}
