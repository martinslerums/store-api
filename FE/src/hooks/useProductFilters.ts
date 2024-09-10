import { ProductFilters } from "@/typings/types";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: ProductFilters = {
    name: searchParams.get("name") as ProductFilters["name"],
    company: searchParams.get("company") as ProductFilters["company"],
    color: searchParams.get("color") as ProductFilters["color"],
    material: searchParams.get("material") as ProductFilters["material"],
    type: searchParams.get("type") as ProductFilters["type"],
  };

  const setFilters = useCallback(
    (filters: Partial<ProductFilters>) => {
      setSearchParams((params) => {

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.set(key, String(value)); 
          } else {
            params.delete(key);
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
