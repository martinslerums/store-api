import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { GetProductsData } from "@/typings/types";
import useQueryString from "./useQueryString";

const useGetProducts = () => {
  const query = useQueryString();

  return useQuery({
    queryKey: ["products", query],
    queryFn: async () => {
      const apiUrl = `http://localhost:3001/api/products${query}`;
      const { data } = await axios.get<GetProductsData>(apiUrl);
      return data;
    },
  });
};

export default useGetProducts;

