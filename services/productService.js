import { prisma } from "../lib/prisma";

export async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export async function getProductById(id) {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
        });
        return product;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
    }
}

export async function createProduct(data) {
    try {
        const product = await prisma.product.create({
            data,
        });
        return { success: true, product };
    } catch (error) {
        console.error("Error creating product:", error);
        return { success: false, error: error.message };
    }
}

export async function updateProduct(id, data) {
    try {
        const product = await prisma.product.update({
            where: { id },
            data,
        });
        return { success: true, product };
    } catch (error) {
        console.error("Error updating product:", error);
        return { success: false, error: error.message };
    }
}

export async function deleteProduct(id) {
    try {
        await prisma.product.delete({
            where: { id },
        });
        return { success: true };
    } catch (error) {
        console.error("Error deleting product:", error);
        return { success: false, error: error.message };
    }
}
