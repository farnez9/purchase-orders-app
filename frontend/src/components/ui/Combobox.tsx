"use client";

import { useState } from "react";
import { CheckIcon, ChevronsUpDownIcon, LoaderCircle } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "./Button";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Input } from "./Input";

interface ComboboxProps {
  placeholder?: string;
  noDataText?: string;
  data: { value: string; label: string }[];
  value?: string | number;
  onChange?: (value: string) => void;
  isLoading?: boolean;
}

export function Combobox({
  placeholder,
  noDataText,
  data,
  value,
  onChange,
  isLoading,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");

  const filteredData = data.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-between md:w-[200px] font-normal",
            placeholder && !value ? "text-gray-400" : ""
          )}
        >
          {value ? data.find((d) => d.value === value)?.label : placeholder}
          {isLoading ? (
            <LoaderCircle className="animate-spin ml-2 h-4 w-4 shrink-0 opacity-50" />
          ) : (
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white">
        <Input
          placeholder="Search product..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full focus:ring-0"
        />
        <div className="max-h-[200px] overflow-auto">
          {filteredData.length === 0 ? (
            <div className="text-sm text-muted-foreground p-2">
              {noDataText}
            </div>
          ) : (
            filteredData.map((d) => (
              <div
                key={d.value}
                onClick={() => {
                  onChange?.(d.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center px-2 py-1.5 cursor-pointer hover:bg-accent rounded text-sm",
                  value === d.value ? "font-medium bg-accent/40" : ""
                )}
              >
                <CheckIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === d.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {d.label}
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
