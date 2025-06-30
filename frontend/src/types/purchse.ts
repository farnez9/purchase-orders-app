export type PurchaseOptionDto = {
    supplierId?: number;
    supplierName?: string;
    shippingDays?: number;
    pricePerUnit?: number;
    quantity?: number;
    baseTotal?: number;
    finalTotal?: number;
};

export type GetBestPurchaseOptionResponseDto = {
    productId: number;
    productName: string;
    purchaseOptions: PurchaseOptionDto[];
};
