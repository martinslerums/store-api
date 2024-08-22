import { create } from "zustand";

type WishlistStore = {
  likedItems: string[];
  addLikedItem: (id: string) => void;
  removeLikedItem: (id: string) => void;
  initializeLikedItems: () => void;
};

const useWishlistStore = create<WishlistStore>((set) => ({
  likedItems: [],

  addLikedItem: (id: string) =>
    set((state) => {
      const updatedLikedItems = [...state.likedItems, id];
      localStorage.setItem("likedItems", JSON.stringify(updatedLikedItems));
      return { likedItems: updatedLikedItems };
    }),

  removeLikedItem: (id: string) =>
    set((state) => {
      const updatedLikedItems = state.likedItems.filter(
        (itemId) => itemId !== id
      );
      localStorage.setItem("likedItems", JSON.stringify(updatedLikedItems));
      return { likedItems: updatedLikedItems };
    }),

  initializeLikedItems: () => {
    const storedLikedItems = JSON.parse(
      localStorage.getItem("likedItems") || "[]"
    );
    set({ likedItems: storedLikedItems });
  },
}));

export default useWishlistStore;
