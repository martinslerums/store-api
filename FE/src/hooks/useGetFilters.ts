import { ProductUniqueFilters } from "@/typings/types";
import { customApi } from "../api/api";
import { useQuery } from "@tanstack/react-query";

const useGetFilters = (type: string) => {
  return useQuery({
    queryKey: ["filters", type],
    queryFn: async () => {
      const { data } = await customApi.get<ProductUniqueFilters>(`/products/${type}/filters`);

      return data;
    },
  });
};

export default useGetFilters;
