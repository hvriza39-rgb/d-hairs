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

/**
 * Returns the `n` most recently created products.
 * Used for the homepage hero slider.
 */
export async function getLatestProducts(n = 3) {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
            take: n,
        });
        return products;
    } catch (error) {
        console.error("Error fetching latest products:", error);
        return [];
    }
}

/**
 * Groups all products by category.
 * Returns an array of:
 *   { category, count, imageUrl, latestProductId }
 * sorted by count descending.
 * The imageUrl and latestProductId are taken from the most recently
 * created product in each category (products are fetched desc by createdAt).
 */
export async function getCategoryGroups() {
    try {
        // Fetch all products sorted newest-first so the first hit per
        // category is automatically the latest one.
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
            select: { id: true, category: true, imageUrl: true },
        });

        const map = new Map();
        for (const p of products) {
            const cat = p.category || "Uncategorized";
            if (!map.has(cat)) {
                // First product we see is the most recent one
                map.set(cat, {
                    category: cat,
                    count: 0,
                    imageUrl: p.imageUrl,
                    latestProductId: p.id,
                });
            }
            map.get(cat).count += 1;
        }

        return Array.from(map.values()).sort((a, b) => b.count - a.count);
    } catch (error) {
        console.error("Error grouping products by category:", error);
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
