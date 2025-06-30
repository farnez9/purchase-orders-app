import type { Product } from "./products";
import type { Supplier } from "./supplier";

export type Stock = {
    id: number;
    supplierId: number;
    productId: number;
    price: number;
    quantity: number;

    supplier?: Supplier;
    product?: Product;
}