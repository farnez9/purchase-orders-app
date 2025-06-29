import prisma from "../client";

export const getProducts = async () => {
    return await prisma.product.findMany();
}