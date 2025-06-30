import type { Supplier } from "./supplier";

export type Discount = {
    id: number;
    supplierId: number;
    type: DiscountType;
    condition: number;
    percentage: number;
    dateCondition?: Date | null;

    supplier?: Supplier;
}

export type DiscountType = "VALUE" | "QUANTITY" | "DATE"
