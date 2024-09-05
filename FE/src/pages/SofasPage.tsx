import { useEffect } from "react";

import Filter from "@/components/Filter";
import ProductCard from "@/components/ProductCard";

import { useProductStore } from "@/stores/productStore";

import useGetFilters from "@/hooks/useGetFilters";
import useGetProducts from "@/hooks/useGetProducts";

import { Sofa } from "@/typings/types";

const SofasPage = () => {
  const { type, company, material, color } = useProductStore();
  const filters = { type, company, material, color };

  const { data: filterValues } = useGetFilters("sofas");
  
  const { data: sofasData, isLoading, isError } = useGetProducts<Sofa []>("sofas", filters);
  const { products } = sofasData || {};



  console.log("SofaPAGE Data", sofasData)

  useEffect(() => {
    console.log("SofaPAGE Mounted");
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
                {products.map((product: Sofa) => (
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

export default SofasPage;
