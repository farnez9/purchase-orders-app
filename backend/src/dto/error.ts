export type ErrorResponseDto = {
    error: string;
};

export class NotFoundError extends Error { }
export class BadRequestError extends Error { }
export class OutOfStockError extends Error { }