import { useForm, type SubmitHandler } from "react-hook-form";
import { useGetPurchaseOptions } from "../../hooks/useGetPurchaseOptions";
import FilterForm from "./FilterForm";
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import PurchaseOptionsTable from "./PurchaseTable";
import PurchaseOptionList from "./PurchaseOptionList";

export type FormValues = {
  productId?: string;
  quantity?: string;
};

const PurchasePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm<FormValues>({
    defaultValues: {
      productId: searchParams.get("productId") || "",
      quantity: searchParams.get("quantity") || "",
    },
  });

  const productId = form.watch("productId");
  const quantity = form.watch("quantity");

  const { data, isFetching, refetch, isError } = useGetPurchaseOptions(
    productId,
    quantity
  );

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form values: ", data);
    refetch();
  };

  useEffect(() => {
    const params: Record<string, string> = {};
    if (productId) params["productId"] = productId;
    if (quantity) params["quantity"] = quantity;
    setSearchParams(params);
  }, [productId, quantity]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Purchase Options</h1>
      <FilterForm form={form} onSubmit={onSubmit} />
      <PurchaseOptionsTable data={data} className="hidden md:block" />
      <PurchaseOptionList data={data} className="md:hidden" />
    </div>
  );
};

export default PurchasePage;
