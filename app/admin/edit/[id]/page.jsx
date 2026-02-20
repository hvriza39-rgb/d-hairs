import { notFound } from "next/navigation";
import { getProductById } from "@/services/productService";
import EditProductForm from "./EditProductForm";

export const metadata = {
    title: "Edit Product | Admin",
};

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    // Convert to plain object for the client component
    const plainProduct = {
        ...product,
        id: product.id.toString(),
        price: product.price,
        createdAt: product.createdAt.toISOString(),
    };

    return (
        <div className="p-8">
            <EditProductForm product={plainProduct} />
        </div>
    );
}
