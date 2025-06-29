import { useQuery } from "@tanstack/react-query";
import { API_URL } from "./queryUtils";
import type { GetProductsResponse } from "../types/products";

const useProducts = () => {
  const { isPending, error, data } = useQuery<GetProductsResponse>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products`);
      return await response.json();
    },
  });

  return {
    isPending,
    error,
    data,
  };
};

export default useProducts;
