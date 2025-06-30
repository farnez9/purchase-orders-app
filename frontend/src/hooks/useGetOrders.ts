import { useQuery } from "@tanstack/react-query";
import { GET_ORDERS_URL } from "./queryUtils";
import type { GetOrdersResponseDto } from "../types/orders";

const useGetProducts = () => {
    const { isLoading, isError, data } = useQuery<GetOrdersResponseDto>({
        queryKey: ["orders"],
        queryFn: async () => {
            const response = await fetch(GET_ORDERS_URL);
            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }
            return await response.json();
        },
    });

    return {
        isLoading,
        isError,
        data,
    };
};

export default useGetProducts;
