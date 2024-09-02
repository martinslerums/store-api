import { ProductUniqueFilters } from "@/typings/types";
import { customApi } from "../api/api";
import { useQuery } from "@tanstack/react-query";

const useGetFilters = () => {
  return useQuery({
    queryKey: ["filters"],
    queryFn: async () => {
      const { data } = await customApi.get<ProductUniqueFilters>(`/products/sofas/filters`);

      return data;
    },
  });
};

export default useGetFilters;
