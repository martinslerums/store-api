import { useQuery } from "@tanstack/react-query";
import { GetProductsData, ProductFilters } from "@/typings/types";
import { customApi } from "../api/api";

const useGetProducts = <T extends object>(productType?: string, filters?: ProductFilters) => {
  const query = new URLSearchParams();

  if (filters) {
    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof ProductFilters];
      if (value !== undefined && value !== null) {
        query.append(key, value.toString());
      }
    });
  }

  const queryString = query.toString();
  const endpoint = productType ? `/products/${productType}` : '/products';
  const url = queryString ? `${endpoint}?${queryString}` : endpoint;

  return useQuery<GetProductsData<T>>({
    queryKey: ["products", productType, filters],
    queryFn: async () => {
      const { data } = await customApi.get<GetProductsData<T>>(url);
      return data;
    },
    enabled: true 
  });
};

export default useGetProducts;
