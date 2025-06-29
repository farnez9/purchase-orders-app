import { RequestHandler } from "express";
import * as purchseService from "../services/purchase.service";

export const getBestPurchaseOption: RequestHandler = async (req, res) => {
    const products = await purchseService.getBestPurchaseOption();
    res.send({ products });
};