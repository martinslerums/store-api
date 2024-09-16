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
    price: getCommaSeparatedValues("price") as ProductFilters["price"],
    company: getCommaSeparatedValues("company") as ProductFilters["company"],
    color: getCommaSeparatedValues("color") as ProductFilters["color"],
    material: getCommaSeparatedValues("material") as ProductFilters["material"],
    type: getCommaSeparatedValues("type") as ProductFilters["type"],
    page: Number(searchParams.get("page")) as ProductFilters["page"] || 1,
  };

  const setFilters = useCallback(
    (filters: Partial<ProductFilters>) => {
      setSearchParams((params) => {
        Object.entries(filters).forEach(([key, value]) => {
          if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
            params.delete(key);
            return;
          }
        
          if (Array.isArray(value)) {
            params.set(key, value.join(","));
            return;
          }
        
          params.set(key, String(value));
        });
        
        return params;
      });
    },
    [setSearchParams]
  );

  const removeFilters = useCallback(
    (filters: Partial<ProductFilters>) => {
      setSearchParams((params) => {
        Object.keys(filters).forEach((key) => {
          params.delete(key);
        });
       
        return params;
      });
    },
    [setSearchParams]
  );

  return { ...filters, setFilters, removeFilters};
};

export default useProductFilters;
