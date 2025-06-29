import type { Product } from "./products";
import type { Supplier } from "./supplier";

export type Stock = {
    id: number;
    supplierId: number;
    supplier: Supplier;
    productId: number;
    product: Product;
    price: number;
    quantity: number;
}