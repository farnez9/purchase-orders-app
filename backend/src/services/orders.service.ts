import prisma from "../client";
import { NotFoundError, OutOfStockError } from "../dto/error";
import { CreateOrderDto } from "../dto/orders";

export const createOrder = async (data: CreateOrderDto) => {
    const {
        productId,
        supplierId,
        shippingDays,
        pricePerUnit,
        quantity,
        baseTotal,
        finalTotal
    } = data;

    return await prisma.$transaction(async (tx) => {
        const stock = await tx.stock.findUnique({
            where: {
                productId_supplierId: {
                    productId,
                    supplierId,
                },
            },
        });

        if (!stock) {
            throw new NotFoundError('Stock does not exist');
        }

        if (stock.quantity < quantity) {
            throw new OutOfStockError('Product out of stock');
        }

        const order = await tx.order.create({
            data: {
                productId,
                supplierId,
                shippingDays,
                pricePerUnit,
                quantity,
                baseTotal,
                finalTotal,
            },
        });

        await tx.stock.update({
            where: {
                id: stock.id,
            },
            data: {
                quantity: stock.quantity - quantity,
            },
        });

        return order;
    });
};

export const getOrders = async () => {
    return await prisma.order.findMany({
        include: {
            product: true,
            supplier: true,
        },
    });
}