import { customApi } from "../api/api";
import { GetProductsData } from "@/typings/types";
import { useQuery } from "@tanstack/react-query";

const useGetCartItems = <T extends object>() => {
  const productIds = JSON.parse(sessionStorage.getItem("cartItems") || "[]");

  return useQuery({
    queryKey: ["cart", productIds],
    queryFn: async () => {
      
      if (productIds.length === 0) {
        return { products: [], nbHits: 0 }; 
      }

      const { data } = await customApi.post<GetProductsData<T>>(`/products/cart`, {
        productIds,
      });

      return data;
    },
    enabled: productIds.length > 0,
  });
};

export default useGetCartItems;
