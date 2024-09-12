import Filter from "@/components/Filter";
import ProductCard from "@/components/ProductCard";

import useGetFilters from "@/hooks/useGetFilters";
import useGetProducts from "@/hooks/useGetProducts";
import useProductFilters  from "@/hooks/useProductFilters";

import { Sofa } from "@/typings/types";

const SofasPage = () => {
  const { type, company, material, color, price } = useProductFilters();
  const filters = { type, company, material, color, price };

  const { data: filterValues } = useGetFilters("sofas");

  const {
    data: sofasData,
    isLoading,
    isError,
  } = useGetProducts<Sofa[]>("sofas", filters);

  const { products } = sofasData || {};


  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-screen-xl">
        <Filter filterValues={filterValues} />

        <div className="flex-grow p-4">
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
            <div className="h-full w-full">
              {!products || products.length === 0 ? (
                <div className="h-full w-full flex justify-center items-center text-lg text-gray-500 text-center">
                  No products available.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                  {products.map((product: Sofa) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SofasPage;
