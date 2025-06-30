import { LoaderCircle } from "lucide-react";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "../../components/ui/Table";
import { cn } from "../../lib/utils";
import type { GetOrdersResponseDto } from "../../types/orders";

interface OrderTableProps {
  data?: GetOrdersResponseDto;
  className?: string;
  isLoading?: boolean;
}

const OrderTable = ({ data, className, isLoading }: OrderTableProps) => {
  console.log("data", data);
  return (
    <div className={cn("p-4 rounded-2xl bg-white shadow-sm border", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price / Unit</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.orders.length > 0 ? (
            data.orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.product?.name}</TableCell>
                <TableCell>{order.supplier?.name}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>${order.pricePerUnit.toFixed(2)}</TableCell>
                <TableCell>${order.finalTotal.toFixed(2)}</TableCell>
                <TableCell>
                  {new Date(order?.createdAt).toLocaleDateString("en-US")}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground p-10"
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin ml-2 h-4 w-4 shrink-0 opacity-50" />
                ) : (
                  "No order available."
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
