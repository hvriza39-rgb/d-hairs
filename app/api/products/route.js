import { NextResponse } from "next/server";
import { createProduct } from "@/services/productService";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, description, price, imageUrl, category, featured } = body;

        // Basic validation
        if (!name || !description || price === undefined || !imageUrl) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const result = await createProduct({
            name,
            description,
            price: parseFloat(price),
            imageUrl,
            category: category || "Uncategorized",
            featured: featured === true,
        });

        if (result.success) {
            return NextResponse.json(result.product, { status: 201 });
        } else {
            return NextResponse.json(
                { message: result.error || "Failed to create product" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("API error creating product:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

// Optional: GET all products (if we want to use API routes instead of direct service calls in server components)
export async function GET() {
    const { getProducts } = await import("@/services/productService");
    const products = await getProducts();
    return NextResponse.json(products);
}
