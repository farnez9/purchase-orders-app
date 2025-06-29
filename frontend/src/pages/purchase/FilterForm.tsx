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
import { useForm, type SubmitHandler } from "react-hook-form";

type FormValues = {
  productId?: string;
  quantity?: string;
};

const FilterForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      productId: "",
      quantity: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form values: ", data);
  };

  // TODO: call api to fetch products

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-3 p-10 md:items-center"
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
                  // TODO: get products from API
                  data={[]}
                  value={field.value}
                  onChange={field.onChange}
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
        <Button variant="outline" type="submit">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default FilterForm;
