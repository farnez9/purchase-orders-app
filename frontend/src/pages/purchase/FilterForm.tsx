import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "../../components/ui/Form";
import { Input } from "../../components/ui/Input";
import { Combobox } from "../../components/ui/Combobox";
import { Button } from "../../components/ui/Button";
import { type SubmitHandler, type UseFormReturn } from "react-hook-form";
import useGetProducts from "../../hooks/useGetProducts";
import { useMemo } from "react";
import type { FormValues } from "./PurchasePage";

interface FilterFormProps {
  form: UseFormReturn<FormValues, any, FormValues>;
  onSubmit: SubmitHandler<FormValues>;
}

const FilterForm = ({ form, onSubmit }: FilterFormProps) => {
  const { isPending, error, data } = useGetProducts();

  const productOptions = useMemo(() => {
    if (!data?.products) return [];
    return data.products?.map((product) => ({
      value: product.id.toString(),
      label: product.name,
    }));
  }, [data?.products]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-3 md:items-center"
      >
        <FormField
          control={form.control}
          name="productId"
          rules={{ required: "Product is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product</FormLabel>
              <FormControl>
                <Combobox
                  placeholder="Select a product"
                  noDataText="No products found"
                  data={productOptions}
                  value={field.value}
                  onChange={field.onChange}
                  isLoading={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          rules={{
            required: "Quantity is required",
            min: { value: 1, message: "Minimum 1 item required" },
          }}
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Select product quantity..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="outline" type="submit" className="mb-1">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default FilterForm;
