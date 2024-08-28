import useGetProducts from "@/hooks/useGetProducts";
import { useEffect } from "react";
import { AllProductsData, Chair, Sofa } from "@/typings/types";
import ProductCard from "@/components/ProductCard";
import { useProductStore } from "@/stores/productStore";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const { name } = useProductStore();
  const { data, isLoading, isError } = useGetProducts<AllProductsData>(
    undefined,
    { name }
  );

  const sofas = data?.products.sofas || [];
  const chairs = data?.products.chairs || [];

  const searchedProducts = name ? [...sofas, ...chairs] : [];

  useEffect(() => {
    console.log("Component Mounted Product Page");
  }, []);

  return (
    <div className="container flex justify-center">
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
          <>
            {name ? (
              searchedProducts && searchedProducts.length > 0 ? (
                <div>
                  <p>Your search results:</p>
                  <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                    {searchedProducts.map((product: Sofa | Chair) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                </div>
              ) : (
                <p>No matching results found for: {name}</p>
              )
            ) : (
              <div className="w-full space-y-4">
                <div className="mx-auto">
                  <h1 className="font-semibold text-lg">Best of sofas: </h1>
                  {sofas.length > 0 ? (
                    <>
                      <FeaturedCarousel products={sofas} />
                      <div className="text-right">
                        <Link to="/products/sofas">View all</Link>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-gray-500">
                      No sofas available.
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="font-semibold text-lg">Best of chairs: </h1>
                  {chairs.length > 0 ? (
                    <>
                      <FeaturedCarousel products={chairs} />
                      <div className="text-right">
                        <Link to="/products/chairs">View all</Link>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-gray-500">
                      No chairs available.
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;

// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

{
  /* <div className="p-10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={handlePreviousPage}
                      isDisabled={isFirstPage}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>{page}</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={handleNextPage}
                      isDisabled={isLastPage}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div> */
}
