import type { Stock } from "./stocks";

export type GetProductsResponse = {
    products: Product[]
};

export type Product = {
    id: number;
    name: string;
    sellingPrice: number;
    stocks: Stock[];
}