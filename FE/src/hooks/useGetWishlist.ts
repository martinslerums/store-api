import { customApi } from "../api/api";
import { GetProductsData } from "@/typings/types";
import { useQuery } from "@tanstack/react-query";

const useGetWishList = <T extends object>() => {
  const productIds = JSON.parse(localStorage.getItem("likedItems") || "[]");

  return useQuery({
    queryKey: ["wishlist", productIds],
    queryFn: async () => {
      
      if (productIds.length === 0) {
        return;
      }

      const { data } = await customApi.post<GetProductsData<T>>(`/products/wishlist`, {
        productIds,
      });

      return data;
    },
    enabled: productIds.length > 0,
  });
};

export default useGetWishList;
