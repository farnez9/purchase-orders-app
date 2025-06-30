import type { Product } from "./products";
import type { PurchaseOptionDto } from "./purchse";
import type { Supplier } from "./supplier";

export interface Order {
    id: number;
    productId: number;
    supplierId: number;
    shippingDays: number;
    pricePerUnit: number;
    quantity: number;
    baseTotal: number;
    finalTotal: number;
    createdAt: Date;

    product?: Product;
    supplier?: Supplier;
}

export type GetOrdersResponseDto = {
    orders: Order[];
};

export type CreateOrderDto = PurchaseOptionDto & {
    productId?: number;
};