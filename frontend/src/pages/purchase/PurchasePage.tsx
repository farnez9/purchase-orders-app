import { useForm, type SubmitHandler } from "react-hook-form";
import { useGetPurchaseOptions } from "../../hooks/useGetPurchaseOptions";
import FilterForm from "./FilterForm";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import PurchaseOptionsTable from "./PurchaseTable";
import PurchaseOptionList from "./PurchaseOptionList";
import { toast } from "../../hooks/useToast";
import { useCreateOrder } from "../../hooks/useCreateOrder";
import { ConfirmDialog } from "../../components/confirmDialog/ConfirmDialog";
import type { PurchaseOptionDto } from "../../types/purchse";

export type FormValues = {
  productId?: string;
  quantity?: string;
};

const PurchasePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedOption, setSelectedOption] = useState<PurchaseOptionDto>();

  const form = useForm<FormValues>({
    defaultValues: {
      productId: searchParams.get("productId") || "",
      quantity: searchParams.get("quantity") || "",
    },
  });

  const productId = form.watch("productId");
  const quantity = form.watch("quantity");

  const {
    data,
    isFetching,
    refetch,
    isError: getError,
  } = useGetPurchaseOptions(productId, quantity);

  useEffect(() => {
    if (getError) {
      toast({
        title: "Error",
        description: "Failed to fetch purchase options.",
        variant: "destructive",
      });
    }
  }, [getError]);

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

  const { createOrder, isError: createError, isSuccess } = useCreateOrder();

  const onCreateOrder = () => {
    createOrder({
      productId: productId ? parseInt(productId) : undefined,
      ...selectedOption,
    });
  };

  useEffect(() => {
    if (createError) {
      toast({
        title: "Error",
        description: "Failed create order.",
        variant: "destructive",
      });
    } else if (isSuccess) {
      toast({
        title: "Success",
        description: "Order created successfully.",
      });
    }
  }, [createError, isSuccess]);

  const onSelectOption = (option: PurchaseOptionDto) => {
    setSelectedOption(option);
    setShowConfirm(true);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Purchase Options</h1>
      <FilterForm form={form} onSubmit={onSubmit} />
      <PurchaseOptionsTable
        data={data}
        isLoading={isFetching}
        className="hidden md:block"
        onSelectOption={onSelectOption}
      />
      <PurchaseOptionList
        data={data}
        className="md:hidden"
        onSelectOption={onSelectOption}
      />
      <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        onConfirm={onCreateOrder}
        title="Are you sure you want to order this product?"
      />
    </div>
  );
};

export default PurchasePage;
