import { Order, Product, Supplier } from "@prisma/client";
import { PurchaseOptionDto } from "./purchase";

export type CreateOrderDto = PurchaseOptionDto & {
    productId: number;
};

export type CreateOrderResponseDto = CreateOrderDto & {
    id: number;
    createdAt: Date;
}

export type GetOrdersResponseDto = {
    orders: OrderDto[];
};

type OrderDto = Order & {
    product: Product;
    supplier: Supplier;
}