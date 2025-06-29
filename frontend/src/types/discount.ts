import type { Supplier } from "./supplier";

export type Discount = {
    id: number;
    supplierId: number;
    supplier: Supplier;
    type: DiscountType;
    condition: number;
    percentage: number;
    dateCondition?: Date | null;
}

export type DiscountType = "VALUE" | "QUANTITY" | "DATE"
