import useGetProducts from "@/hooks/useGetProducts";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/typings/types";
import Filter from "@/components/Filter";
import { useEffect } from "react";

const Products = () => {
  
  const { data, isLoading, isError } = useGetProducts();

  useEffect(() => {
    console.log("Component mounted");
  }, []);


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  const { products = [] } = data || {};


  return (
    <div className="flex">
      <div className="max-w-[300px] w-full border border-black">
        <Filter />
      </div>
      <div>
        {products.length === 0 ? (
          <div>No products available.</div>
        ) : (
          <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {products.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
