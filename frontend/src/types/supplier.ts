import type { Discount } from "./discount";
import type { Stock } from "./stocks";

export type Supplier = {
    id: number;
    name: string;
    shippingDays: number;
    stocks: Stock[];
    discounts: Discount[];
}