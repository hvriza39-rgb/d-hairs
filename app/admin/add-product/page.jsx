"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";

const CATEGORIES = [
    "Lace Front Wigs",
    "Hair Bundles",
    "Closures & Frontals",
    "Colored Wigs",
    "Extensions",
    "Other",
];

export default function AddProductForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        category: "Lace Front Wigs",
        featured: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleUploadSuccess = (result) => {
        const url = result?.info?.secure_url;
        if (url) setImageUrl(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    imageUrl: imageUrl || "",
                }),
            });

            if (response.ok) {
                router.push("/admin/products");
                router.refresh();
            } else {
                const error = await response.json();
                alert(`Failed to add product: ${error.message}`);
            }
        } catch (error) {
            alert("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
                <p className="mt-1 text-sm text-gray-500">Fill in the details to add a new product to your store.</p>
            </div>
            <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Cloudinary Upload Widget */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Image *
                        </label>
                        <CldUploadWidget
                            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                            onSuccess={handleUploadSuccess}
                            options={{ sources: ["local"] }}
                        >
                            {({ open }) => (
                                <button
                                    type="button"
                                    onClick={() => open()}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 hover:bg-gray-50 text-sm text-gray-600"
                                >
                                    Upload image
                                </button>
                            )}
                        </CldUploadWidget>

                        {imageUrl ? (
                            <div className="mt-3">
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className="h-40 w-40 rounded-xl object-cover border"
                                />
                            </div>
                        ) : (
                            <p className="mt-2 text-xs text-gray-500">
                                Upload an image (Cloudinary) or paste an image URL below.
                            </p>
                        )}

                        <input type="hidden" name="imageUrl" value={imageUrl} />

                        {/* Fallback: manual URL input */}
                        <div className="mt-3">
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Or paste an image URL
                            </label>
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://..."
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name *</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-2 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm px-4 py-3 border"
                                placeholder="e.g. Bone Straight 24 inches"
                            />
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₦) *</label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                required
                                min="0"
                                step="1000"
                                value={formData.price}
                                onChange={handleChange}
                                className="mt-2 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm px-4 py-3 border"
                                placeholder="150000"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category *</label>
                        <select
                            name="category"
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-2 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm px-4 py-3 border bg-white"
                        >
                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            required
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-2 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm px-4 py-3 border"
                            placeholder="Detailed description of the hair..."
                        />
                    </div>

                    {/* Featured toggle */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="featured"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            className="h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                        />
                        <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                            Mark as Featured
                        </label>
                        <span className="text-xs text-gray-400">(Featured products may appear in promotional spots)</span>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="bg-white py-2.5 px-6 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none mr-4"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || !imageUrl}
                            className={`inline-flex justify-center py-2.5 px-8 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white ${isSubmitting || !imageUrl ? "bg-pink-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"
                                }`}
                        >
                            {isSubmitting ? "Saving..." : "Save Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
