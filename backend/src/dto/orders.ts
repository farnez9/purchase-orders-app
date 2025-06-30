import { PurchaseOptionDto } from "./purchase";

export type CreateOrderDto = PurchaseOptionDto & {
    productId: number;
};

export type CreateOrderResponseDto = CreateOrderDto & {
    id: number;
    createdAt: Date;
}