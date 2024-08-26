import { useState, useEffect } from "react";

import useWishlistStore from "@/stores/wishlistStore";

import { FaHeart, FaRegHeart } from "react-icons/fa";

type WishlistHartProps = {
  id: string;
  customClass?: string
};

const WishlistHart = ({ id, customClass }: WishlistHartProps) => {
  const { likedItems, addLikedItem, removeLikedItem } = useWishlistStore();
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    setLiked(likedItems.includes(id));
  }, [likedItems, id]);

  const handleLiked = () => {
    if (liked) {
      removeLikedItem(id);
    } else {
      addLikedItem(id);
    }
    setLiked(!liked);
  };

  return (
    <>
      {liked ? (
        <FaHeart className={`cursor-pointer ${customClass}`} onClick={handleLiked} />
      ) : (
        <FaRegHeart className="cursor-pointer" onClick={handleLiked} />
      )}
    </>
  );
};

export default WishlistHart;
