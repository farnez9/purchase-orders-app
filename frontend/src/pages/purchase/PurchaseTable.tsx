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
import type {
  GetBestPurchaseOptionResponseDto,
  PurchaseOptionDto,
} from "../../types/purchse";
import { Button } from "../../components/ui/Button";

interface PurchaseOptionsTableProps {
  data?: GetBestPurchaseOptionResponseDto;
  className?: string;
  isLoading?: boolean;
  onSelectOption?: (option: PurchaseOptionDto) => void;
}

const PurchaseOptionsTable = ({
  data,
  className,
  isLoading,
  onSelectOption,
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
                <TableCell>${option.pricePerUnit?.toFixed(2)}</TableCell>
                <TableCell>{option.quantity}</TableCell>
                <TableCell>${option.baseTotal?.toFixed(2)}</TableCell>
                <TableCell className="font-semibold text-green-600">
                  ${option.finalTotal?.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => onSelectOption?.(option)}
                  >
                    Buy
                  </Button>
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
                  "No purchase options available."
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PurchaseOptionsTable;
