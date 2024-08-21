import { useQuery } from "@tanstack/react-query";
import { GetProductFilters, GetProductsData } from "@/typings/types";
import { customApi } from "../api/api";

const useGetProducts = (filters?: GetProductFilters) => {
  const query = new URLSearchParams();

  if (filters) {
    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof GetProductFilters];

      if (value !== undefined && value !== null) {
        query.append(key, value.toString());
      }
    });
  }

  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const { data } = await customApi.get<GetProductsData>(`/products?${query.toString()}`);
      return data;
    },
  });
};

export default useGetProducts;
