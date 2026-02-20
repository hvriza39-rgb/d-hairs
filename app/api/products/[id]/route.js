import { NextResponse } from "next/server";
import { updateProduct, deleteProduct } from "@/services/productService";

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, description, price, imageUrl } = body;

        if (!name || !description || price === undefined || !imageUrl) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const result = await updateProduct(id, {
            name,
            description,
            price: parseFloat(price),
            imageUrl,
        });

        if (result.success) {
            return NextResponse.json(result.product);
        } else {
            return NextResponse.json({ message: result.error || "Failed to update" }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const result = await deleteProduct(id);

        if (result.success) {
            return NextResponse.json({ message: "Deleted successfully" });
        } else {
            return NextResponse.json({ message: result.error || "Failed to delete" }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
