import { useEffect } from "react";
import useGetOrders from "../../hooks/useGetOrders";
import OrderList from "./OrderList";
import OrderTable from "./OrderTable";
import { toast } from "../../hooks/useToast";

const OrdersPage = () => {
  const { data, isLoading, isError } = useGetOrders();

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: "Failed to fetch orders.",
        variant: "destructive",
      });
    }
  }, [isError]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <OrderTable
        data={data}
        isLoading={isLoading}
        className="hidden md:block"
      />
      <OrderList data={data} className="md:hidden" />
    </div>
  );
};

export default OrdersPage;
