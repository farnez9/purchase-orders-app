import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "../../components/ui/Table";
import { cn } from "../../lib/utils";
import type { GetBestPurchaseOptionResponseDto } from "../../types/purchse";

interface PurchaseOptionsTableProps {
  data?: GetBestPurchaseOptionResponseDto;
  className?: string;
}

const PurchaseOptionsTable = ({
  data,
  className,
}: PurchaseOptionsTableProps) => {
  return (
    <div className={cn("p-4 rounded-2xl bg-white shadow-sm border", className)}>
      {data && (
        <h2 className="text-xl font-semibold mb-4">
          Purchase Options for{" "}
          <span className="text-primary">{data?.productName}</span>
        </h2>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Supplier</TableHead>
            <TableHead>Shipping Days</TableHead>
            <TableHead>Price / Unit</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Base Total</TableHead>
            <TableHead>Final Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.purchaseOptions.length > 0 ? (
            data.purchaseOptions.map((option, i) => (
              <TableRow
                key={option.supplierId}
                className={cn(i == 0 && "bg-green-50")}
              >
                <TableCell>{option.supplierName}</TableCell>
                <TableCell>{option.shippingDays} days</TableCell>
                <TableCell>${option.pricePerUnit.toFixed(2)}</TableCell>
                <TableCell>{option.quantity}</TableCell>
                <TableCell>${option.baseTotal.toFixed(2)}</TableCell>
                <TableCell className="font-semibold text-green-600">
                  ${option.finalTotal.toFixed(2)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground p-10"
              >
                No purchase options available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PurchaseOptionsTable;
