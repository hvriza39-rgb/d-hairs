import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Temporary mock data. Will be replaced by Prisma backend.
const mockProducts = [
    {
        id: "1",
        name: "Bone Straight 24 inches",
        description: "Premium double drawn bone straight human hair. Silky smooth texture with full density from top to bottom. 100% unprocessed virgin hair that can be bleached, dyed, and styled to your preference. Guaranteed no tangling or shedding with proper care.",
        price: 150000,
        imageUrl: "https://images.unsplash.com/photo-1519714859231-01646270b205?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: "2",
        name: "Body Wave 20 inches",
        description: "Luxurious body wave bundles. 100% unprocessed virgin hair that holds curls beautifully. Soft, bouncy, and versatile.",
        price: 120000,
        imageUrl: "https://images.unsplash.com/photo-1580617945535-64bcbd741d45?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: "3",
        name: "Deep Curly Frontal Wig",
        description: "Voluminous deep curly 13x4 lace frontal wig. Pre-plucked hairline with hd lace that melts perfectly into all skin tones. 180% density for maximum volume.",
        price: 185000,
        imageUrl: "https://images.unsplash.com/photo-1595426173007-90ff7daceb27?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: "4",
        name: "Blonde Highlight 613",
        description: "Custom colored 613 blonde highlights on straight hair. Perfect for summer outtings. Expertly colored to maintain hair health and shine.",
        price: 95000,
        imageUrl: "https://plus.unsplash.com/premium_photo-1673890333010-80a256157973?q=80&w=600&auto=format&fit=crop"
    }
];

export async function generateMetadata({ params }) {
    const { id } = await params;
    const product = mockProducts.find(p => p.id === id);
    if (!product) return { title: "Product Not Found" };
    return {
        title: `${product.name} | D-Hairs`,
        description: product.description.substring(0, 160)
    };
}

export default async function ProductPage({ params }) {
    const { id } = await params;

    // Later: const product = await prisma.product.findUnique({ where: { id }})
    const product = mockProducts.find(p => p.id === id);

    if (!product) {
        notFound();
    }

    const formattedPrice = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0,
    }).format(product.price);

    const whatsappMessage = `Hello, I want to order ${product.name} for ${formattedPrice}`;
    // 2348012345678 is a placeholder phone number. User needs to replace it.
    const whatsappUrl = `https://wa.me/2348012345678?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="bg-white min-h-screen pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb Navigation */}
                <nav className="flex mb-8 text-sm" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link href="/" className="text-gray-500 hover:text-pink-600 transition-colors">Home</Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="mx-2 text-gray-400">/</span>
                                <Link href="/shop" className="text-gray-500 hover:text-pink-600 transition-colors">Shop</Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <span className="mx-2 text-gray-400">/</span>
                                <span className="text-gray-900 font-medium">{product.name}</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    {/* Product Image */}
                    <div className="lg:max-w-xl lg:self-center">
                        <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-gray-100 relative shadow-sm border border-gray-100">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover object-center"
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                priority
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="mt-10 px-4 sm:px-0 lg:mt-0 flex flex-col justify-center">
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">{product.name}</h1>

                        <div className="mb-6">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl sm:text-4xl tracking-tight font-bold text-pink-600">{formattedPrice}</p>
                        </div>

                        {/* Badges/Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            <span className="inline-flex items-center rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700 border border-pink-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mr-1.5"></span> In Stock
                            </span>
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 border border-gray-200">
                                Free Delivery on pre-orders
                            </span>
                        </div>

                        <div className="mb-10">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                            <div className="space-y-4 text-base text-gray-600 leading-relaxed">
                                <p>{product.description}</p>
                            </div>
                        </div>

                        <div className="mt-auto border-t border-gray-100 pt-8">
                            {/* Call to action */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-[#25D366] hover:bg-[#128C7E] border border-transparent rounded-2xl py-4 px-8 flex items-center justify-center text-lg font-bold text-white shadow-md shadow-[#25D366]/20 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current mr-2.5" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                                    Order on WhatsApp
                                </a>
                            </div>
                            <p className="mt-4 text-center text-sm text-gray-500">
                                Clicking the button will open WhatsApp with a pre-filled order message.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
