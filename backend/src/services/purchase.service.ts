import prisma from "../client";
import { NotFoundError } from "../dto/error";
import { Discount, DiscountType } from "@prisma/client";
import { GetBestPurchaseOptionResponseDto, PurchaseOptionDto } from "../dto/purchase";

export const getBestPurchaseOptions = async (productId: number, quantity: number): Promise<GetBestPurchaseOptionResponseDto> => {
    const product = await prisma.product.findUnique({
        where: { id: productId },
        include: {
            stocks: {
                include: {
                    supplier: {
                        include: { discounts: true },
                    },
                },
            },
        },
    });

    if (!product) {
        throw new NotFoundError("Product not found");
    }

    const purchaseOptions: PurchaseOptionDto[] = [];

    const orderDate = new Date();

    for (const stock of product.stocks) {
        if (stock.quantity < quantity) continue;

        const supplier = stock.supplier;
        const baseTotal = stock.price * quantity;

        const applicableDiscounts = filterApplicableDiscounts(
            supplier.discounts,
            baseTotal,
            quantity,
            orderDate
        );

        const finalTotal = applyDiscounts(baseTotal, applicableDiscounts);

        purchaseOptions.push({
            supplierId: supplier.id,
            supplierName: supplier.name,
            shippingDays: supplier.shippingDays,
            pricePerUnit: stock.price,
            quantity,
            baseTotal,
            finalTotal: parseFloat(finalTotal.toFixed(2)),
        });
    }

    if (purchaseOptions.length === 0) {
        throw new NotFoundError('No suppliers with enough stock');
    }

    purchaseOptions.sort((a, b) => a.finalTotal - b.finalTotal || a.shippingDays - b.shippingDays);

    return {
        productId: product.id,
        productName: product.name,
        purchaseOptions,
    };
}


function filterApplicableDiscounts(
    discounts: Discount[],
    baseTotal: number,
    quantity: number,
    orderDate: Date
) {
    return discounts.filter((d) => {
        switch (d.type) {
            case DiscountType.VALUE:
                return baseTotal >= d.condition;
            case DiscountType.QUANTITY:
                return quantity >= d.condition;
            case DiscountType.DATE:
                if (!d.dateCondition) return false;
                return d.dateCondition.getMonth() === orderDate.getMonth();
            default:
                return false;
        }
    });
}

function applyDiscounts(baseTotal: number, discounts: Discount[]) {
    return discounts.reduce(
        (total, discount) => total * (1 - discount.percentage / 100),
        baseTotal
    );
}

