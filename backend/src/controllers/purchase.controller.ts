import { RequestHandler } from "express";
import * as purchseService from "../services/purchase.service";
import { GetBestPurchaseOptionRequestDto, GetBestPurchaseOptionResponseDto } from "../dto/purchase";
import { BadRequestError, ErrorResponseDto, NotFoundError } from "../dto/error";

export const getBestPurchaseOption: RequestHandler<
    undefined,
    GetBestPurchaseOptionResponseDto | ErrorResponseDto,
    undefined,
    GetBestPurchaseOptionRequestDto
> = async (req, res) => {
    const productId = parseInt(req.query.productId);
    const quantity = parseInt(req.query.quantity);

    if (isNaN(productId) || isNaN(quantity) || quantity <= 0) {
        res.status(400).json({ error: 'Product not found' });
    }

    try {
        const purchaseOptions = await purchseService.getBestPurchaseOptions(productId, quantity);
        res.json(purchaseOptions)
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ error: error.message });
        }
        if (error instanceof BadRequestError) {
            res.status(400).json({ error: error.message });
        }
    }
};

