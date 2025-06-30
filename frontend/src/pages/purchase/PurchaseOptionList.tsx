import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import type {
  GetBestPurchaseOptionResponseDto,
  PurchaseOptionDto,
} from "../../types/purchse";
import { cn } from "../../lib/utils";

interface PurchaseOptionListProps {
  data?: GetBestPurchaseOptionResponseDto;
  className?: string;
  onSelectOption?: (option: PurchaseOptionDto) => void;
}

const PurchaseOptionList = ({
  data,
  className,
  onSelectOption,
}: PurchaseOptionListProps) => {
  return (
    <div className={cn("mt-10", className)}>
      {data && (
        <h2 className="text-xl font-semibold mb-4">
          Purchase Options for{" "}
          <span className="text-primary">{data?.productName}</span>
        </h2>
      )}

      {data && data.purchaseOptions.length === 0 ? (
        <p className="text-muted-foreground">No purchase options available.</p>
      ) : (
        data?.purchaseOptions.map((option, i) => (
          <Card
            key={option.supplierId}
            className={cn(
              "border shadow-sm rounded-2xl mb-4",
              i == 0 && "border-green-600 bg-green-50"
            )}
            onClick={() => onSelectOption?.(option)}
          >
            <CardHeader>
              <CardTitle>{option.supplierName}</CardTitle>
              <CardDescription>
                {option.shippingDays} day shipping
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">Price/Unit:</span>{" "}
                ${option.pricePerUnit?.toFixed(2)}
              </div>
              <div>
                <span className="font-medium text-foreground">Quantity:</span>{" "}
                {option.quantity}
              </div>
              <div>
                <span className="font-medium text-foreground">Base Total:</span>{" "}
                ${option.baseTotal?.toFixed(2)}
              </div>
              <div>
                <span className="font-medium text-foreground">
                  Final Total:
                </span>{" "}
                <span className="text-green-600 font-semibold">
                  ${option.finalTotal?.toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default PurchaseOptionList;
