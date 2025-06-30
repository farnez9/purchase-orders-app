import { useQuery } from "@tanstack/react-query";
import { GET_PRODUCTS_URL } from "./queryUtils";
import type { GetProductsResponse } from "../types/products";

const useGetProducts = () => {
  const { isPending, error, data } = useQuery<GetProductsResponse>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(GET_PRODUCTS_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    },
  });

  return {
    isPending,
    error,
    data,
  };
};

export default useGetProducts;
