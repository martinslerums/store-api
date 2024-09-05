import { useEffect } from "react";

import Filter from "@/components/Filter";
import ProductCard from "@/components/ProductCard";

import { useProductStore } from "@/stores/productStore";

import useGetProducts from "@/hooks/useGetProducts";
import useGetFilters from "@/hooks/useGetFilters";

import { Chair } from "@/typings/types";

const ChairsPage = () => {
  const { type, company, material, color } = useProductStore();
  const filters = { type, company, material, color };

  const { data: filterValues } = useGetFilters("chairs");

  const { data: chairsData, isLoading, isError } = useGetProducts<Chair []>("chairs", filters);
  const { products } = chairsData || {};

  console.log("ChairPage Data", chairsData)

  useEffect(() => {
    console.log("ChairPage Mounted");
  }, []);

  return (
    <div className="flex justify-center">
      <div className="max-w-[300px] w-full">
        <Filter filterValues={filterValues} />
      </div>
      <div className="flex-1 p-4">
        {isLoading && (
          <div className="text-lg text-gray-500 flex justify-center items-center h-screen">
            Loading...
          </div>
        )}
        {isError && (
          <div className="text-lg text-red-500 flex justify-center items-center h-screen">
            Error loading products
          </div>
        )}

        {!isLoading && !isError && (
          <div>
            {!products || products.length === 0 ? (
              <div className="text-lg text-gray-500 flex justify-center items-center">
                No products available.
              </div>
            ) : (
              <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {products.map((product: Chair) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChairsPage;
