import { RequestHandler } from "express";
import * as productsService from "../services/products.service";

export const getProducts: RequestHandler = async (req, res) => {
    const products = await productsService.getProducts();
    res.send({ products });
};