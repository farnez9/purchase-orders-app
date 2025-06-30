import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { cn } from "../../lib/utils";
import type { GetOrdersResponseDto } from "../../types/orders";

interface OrderListProps {
  data?: GetOrdersResponseDto;
  className?: string;
}

const OrderList = ({ data, className }: OrderListProps) => {
  return (
    <div className={cn("mt-10", className)}>
      {data && data.orders.length === 0 ? (
        <p className="text-muted-foreground">No order available.</p>
      ) : (
        data?.orders.map((order) => (
          <Card key={order.id} className="border shadow-sm rounded-2xl mb-4">
            <CardHeader>
              <CardTitle>{order.product?.name}</CardTitle>
              <CardDescription>{order.product?.name}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">Price/Unit:</span>{" "}
                ${order.pricePerUnit.toFixed(2)}
              </div>
              <div>
                <span className="font-medium text-foreground">Quantity:</span>{" "}
                {order.quantity}
              </div>
              <div>
                <span className="font-medium text-foreground">Total:</span> $
                {order.finalTotal.toFixed(2)}
              </div>
              <div>
                <span className="font-medium text-foreground">Date:</span>{" "}
                <span>
                  {" "}
                  {new Date(order?.createdAt).toLocaleDateString("en-US")}
                </span>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default OrderList;
