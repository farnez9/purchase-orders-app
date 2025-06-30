import { RequestHandler } from "express";
import * as orderService from "../services/orders.service"
import { CreateOrderDto, CreateOrderResponseDto } from "../dto/orders";
import { ErrorResponseDto } from "../dto/error";

export const createOrder: RequestHandler<
    undefined,
    CreateOrderResponseDto | ErrorResponseDto,
    CreateOrderDto,
    undefined
> = async (req, res) => {
    const body: CreateOrderDto = req.body;

    if (!body.productId || !body.supplierId || !body.quantity) {
        res.status(400).json({ error: 'Missing required fields' });
    }

    const order = await orderService.createOrder(body);

    res.status(201).json({
        ...order,
        supplierName: body.supplierName,
    });
};