import ProductCard from "@/components/ProductCard";
import Filter from "@/components/Filter";
import { useProductStore } from "@/stores/productStore";
import { useEffect } from "react";
import useGetProducts from "@/hooks/useGetProducts";
import { Chair } from "@/typings/types";

const ChairsPage = () => {

  const { type, name } = useProductStore();
  const filters = { type, name };

  const { data, isLoading, isError } = useGetProducts<Chair []>("chairs", filters);
  const { products } = data || {};

  console.log("Data from ChairsPage", data)

  useEffect(() => {
    console.log("Component Mounted");
  }, []);

  return (
    <div className="flex justify-center">
      <div className="max-w-[300px] w-full border border-black">
        <Filter />
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
