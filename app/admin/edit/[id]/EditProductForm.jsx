"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductForm({ product }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [imageUrl, setImageUrl] = useState(product.imageUrl || "");
    const [formData, setFormData] = useState({
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/products/${product.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, price: parseFloat(formData.price), imageUrl }),
            });
            if (response.ok) {
                router.push("/admin/products");
                router.refresh();
            } else {
                const error = await response.json();
                alert(`Failed to update: ${error.message}`);
            }
        } catch {
            alert("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this product? This cannot be undone.")) return;
        setIsDeleting(true);
        try {
            const response = await fetch(`/api/products/${product.id}`, { method: "DELETE" });
            if (response.ok) {
                router.push("/admin/products");
                router.refresh();
            } else {
                alert("Failed to delete product.");
            }
        } catch {
            alert("An unexpected error occurred.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Edit Product</h2>
                    <p className="mt-1 text-sm text-gray-500">Update your product details below.</p>
                </div>
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            </div>

            <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Image URL *</label>
                        <input
                            type="url"
                            required
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                        />
                        {imageUrl && (
                            <div className="mt-3 rounded-xl overflow-hidden border border-gray-100 aspect-video bg-gray-50">
                                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name *</label>
                            <input
                                type="text" name="name" id="name" required
                                value={formData.name} onChange={handleChange}
                                className="mt-2 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm px-4 py-3 border"
                                placeholder="e.g. Bone Straight 24 inches"
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₦) *</label>
                            <input
                                type="number" name="price" id="price" required min="0" step="1000"
                                value={formData.price} onChange={handleChange}
                                className="mt-2 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm px-4 py-3 border"
                                placeholder="150000"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description *</label>
                        <textarea
                            id="description" name="description" rows={4} required
                            value={formData.description} onChange={handleChange}
                            className="mt-2 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm px-4 py-3 border"
                            placeholder="Detailed description..."
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button type="button" onClick={() => router.back()}
                            className="bg-white py-2.5 px-6 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mr-4">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting}
                            className={`inline-flex justify-center py-2.5 px-8 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white ${isSubmitting ? "bg-pink-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"}`}>
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
