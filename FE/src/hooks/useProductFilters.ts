import { ProductFilters } from "@/typings/types";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getCommaSeparatedValues = (key: string): string[] => {
    const value = searchParams.get(key);
    return value ? value.split(",").map((v) => v.trim()) : [];
  };

  const filters: ProductFilters = {
    name: searchParams.get("name") as ProductFilters["name"],
    company: getCommaSeparatedValues("company") as ProductFilters["company"],
    color: getCommaSeparatedValues("color") as ProductFilters["color"],
    material: getCommaSeparatedValues("material") as ProductFilters["material"],
    type: getCommaSeparatedValues("type") as ProductFilters["type"],
  };

  const setFilters = useCallback(
    (filters: Partial<ProductFilters>) => {
      setSearchParams((params) => {
        Object.keys(filters).forEach((key) => {
          params.delete(key);
        });

        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            if (value.length > 0) {
              params.set(key, value.join(","));
            }
          } else if (value !== undefined && value !== null) {
            params.set(key, String(value));
          }
        });

        return params;
      });
    },
    [setSearchParams]
  );

  return { ...filters, setFilters };
};

export default useProductFilters;
