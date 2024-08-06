import useGetProducts from "@/hooks/useGetProducts";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/typings/types";
import Filter from "@/components/Filter";
import { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Products = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError } = useGetProducts();
  const { products = [] } = data || {};
  
  const productsLength = products.length;

  const currentUrl = new URL(window.location.href);

  const isLastPage = products.length < limit; 
  const isFirstPage = page <= 1;

  console.log("productsLength: ", productsLength)

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const pageParam = currentUrl.searchParams.get("page");

    if (!pageParam || isNaN(Number(pageParam)) || Number(pageParam) < 1) {
      currentUrl.searchParams.set("page", "1");
      window.history.replaceState({}, "", currentUrl);
    }

    setPage(Number(pageParam) || 1);
    console.log("Products Component Mounted")
  }, []);


  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    
    currentUrl.searchParams.set("page", nextPage.toString());
    window.history.pushState({}, "", currentUrl);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const handlePreviousPage = () => {

    if (page > 1) {
      const previousPage = page - 1;
      setPage(previousPage);

      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("page", previousPage.toString());
      window.history.pushState({}, "", currentUrl);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div className="flex">
      <div className="max-w-[300px] w-full border border-black">
        <Filter />
      </div>
      <div>
        {products.length === 0 ? (
          <div>No products available.</div>
        ) : (
          <div>
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {products.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="p-10">
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
                    <PaginationNext onClick={handleNextPage} isDisabled={isLastPage}/>
                    
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
