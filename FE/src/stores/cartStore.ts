import { create } from "zustand";

// CODE DUPLICATE from WishListStore - Will be removed once authentication is added

type CartStore = {
  cartItems: string[];
  addItemToCart: (id: string) => void;
  removeItemFromCart: (id: string) => void;
  initializeCartItems: () => void;
};

const useCartStore = create<CartStore>((set) => ({
  cartItems: [],

  addItemToCart: (id: string) =>
    set((state) => {
      const updatedCartItems = [...state.cartItems, id];
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      console.log("addItemToCart in STORE RUN!")
      return { cartItems: updatedCartItems };
    }),

  removeItemFromCart: (id: string) =>
    set((state) => {
      const updatedCartItems = state.cartItems.filter(
        (itemId) => itemId !== id
      );
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return { cartItems: updatedCartItems };
    }),

  initializeCartItems: () => {
    const storedCartItems = JSON.parse(
      sessionStorage.getItem("cartItems") || "[]"
    );
    set({ cartItems: storedCartItems });
  },
}));

export default useCartStore;
