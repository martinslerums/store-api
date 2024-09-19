import { useEffect } from "react";

import useCartStore from "@/stores/cartStore";

import useGetCartItems from "@/hooks/useGetCartItems";

import { Sofa, Chair } from "@/typings/types";
import { ItemCounter } from "@/components/ItemCounter";

const CartPage = () => {
  const { data, isLoading, isError, error } = useGetCartItems();
  const { cartItems, initializeCartItems } = useCartStore();

  useEffect(() => {
    initializeCartItems();
  }, [initializeCartItems]);

  const products = Array.isArray(data?.products) ? data.products.filter((product) => cartItems.includes(product._id)) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading && (
        <div className="flex justify-center items-center h-screen text-md text-gray-500">
          Loading...
        </div>
      )}
      {isError && (
        <div className="flex justify-center items-center h-screen text-lg text-red-500">
          Error loading products: {error?.message || "Something went wrong"}
        </div>
      )}

      {!isLoading && !isError && (
        <div className="border border-gray-300">
          {products.length > 0 ? (
            products.map((product: Sofa | Chair, index) => (
              <div key={product._id} className="px-4 relative">
                <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-48 h-48 object-cover sm:w-32 sm:h-32"
                  />
                  <div className="flex-grow justify-start w-full">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">
                      {product.name.toUpperCase()}
                    </h2>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                  <ItemCounter />
                  <div className="flex items-center justify-between w-full sm:w-44">
                    <p className="text-md font-bold text-gray-800 mb-2 sm:mb-0">
                      {new Intl.NumberFormat("en-EU", {
                        style: "currency",
                        currency: "EUR",
                      }).format(product.price)}
                    </p>
                    
                  </div>
                </div>
                {index < products.length - 1 && (
                  <hr className="mt-2 sm:mt-0 border-gray-300" />
                )}
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center text-sm text-gray-500">
              No products
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage