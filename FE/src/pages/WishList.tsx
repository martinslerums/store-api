import ProductCard from "@/components/ProductCard";
import useGetWishList from "@/hooks/useGetWishlist";
import { Product } from "@/typings/types";
import { GetProductsData } from "@/typings/types";
import { useEffect } from "react";

import useWishlistStore from "../stores/wishlistStore";


const WishList = () => {
  const { data, isLoading, isError } = useGetWishList();
  const { likedItems, initializeLikedItems } = useWishlistStore();

  useEffect(() => {
    initializeLikedItems();
  }, [initializeLikedItems]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  const products = (data as GetProductsData)?.products.filter(product => likedItems.includes(product._id));

  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      {products ? (
        products.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <div>No products</div>
      )}
    </div>
  );
};

export default WishList;
