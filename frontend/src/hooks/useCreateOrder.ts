import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateOrderDto } from '../types/orders';
import { CREATE_ORDER_URL } from './queryUtils';

async function createOrder(orderData: CreateOrderDto) {
    const res = await fetch(CREATE_ORDER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create order');
    }

    return res.json();
}

export function useCreateOrder() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });

    return {
        createOrder: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        data: mutation.data,
        isSuccess: mutation.isSuccess,
    }
}
