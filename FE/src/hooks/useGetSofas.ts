import { useQuery } from "@tanstack/react-query";
import { GetProductsData, GetSofaFilters } from "@/typings/types";
import { customApi } from "../api/api";

const useGetSofas = (filters?: GetSofaFilters) => {
  const query = new URLSearchParams();

  if (filters) {
    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof GetSofaFilters];

      if (value !== undefined && value !== null) {
        query.append(key, value.toString());
      }
    });
  }

  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const { data } = await customApi.get<GetProductsData>(`/products/sofas?${query.toString()}`);
      return data;
    },
  });
};

export default useGetSofas;
