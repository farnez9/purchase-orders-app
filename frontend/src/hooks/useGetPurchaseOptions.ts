import { useQuery } from "@tanstack/react-query";
import { GET_PURCHASE_OPTIONS_URL } from "./queryUtils";
import type { GetBestPurchaseOptionResponseDto } from "../types/purchse";

const getPurchaseOptions = async (productId?: string, quantity?: string) => {
  const params = new URLSearchParams();
  if (productId) params.append("productId", productId);
  if (quantity) params.append("quantity", quantity);

  const response = await fetch(
    `${GET_PURCHASE_OPTIONS_URL}${params.toString()}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Purchase options not found");
    } else if (response.status === 400) {
      throw new Error("Invalid request parameters");
    } else {
      throw new Error("Failed to fetch purchase options");
    }
  }
  return response.json();
};

export const useGetPurchaseOptions = (
  productId?: string,
  quantity?: string
) => {
  const { data, isFetching, refetch, isError } =
    useQuery<GetBestPurchaseOptionResponseDto>({
      queryKey: ["getPurchaseOptions"],
      queryFn: () => getPurchaseOptions(productId, quantity),
      enabled: false,
    });

  return {
    data,
    isFetching,
    refetch,
    isError,
  };
};
