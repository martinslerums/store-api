import { Link } from "react-router-dom";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { useEffect, useState } from "react";
import useWishlistStore from "@/stores/wishlistStore";

const Navbar = () => {
  const { likedItems, initializeLikedItems } = useWishlistStore();
  const [likedCount, setLikedCount] = useState(likedItems.length);

  useEffect(() => {
    initializeLikedItems(); // Initialize on mount
  }, [initializeLikedItems]);

  useEffect(() => {
    setLikedCount(likedItems.length);
  }, [likedItems]);

  return (
    <header className="bg-gray-800 p-4">
      <nav className="flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/path-to-your-logo.png"
            alt="Logo"
            className="h-10 w-auto"
          />
        </Link>
        <ul className="flex space-x-4 items-center">
          <li>
            <Link
              to="/products"
              className="text-white font-bold hover:text-orange-400"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="text-white font-bold hover:text-orange-400"
            >
              Register
            </Link>
          </li>
          <li className="relative">
            <Link
              to="/wish-list"
              className="text-white hover:text-orange-400 text-2xl relative"
            >
              <CiHeart />
              {likedCount > 0 && (
                <span className="absolute -top-1 -right-3 bg-red-500 text-white rounded-full h-5 w-5 text-xs flex items-center justify-center">
                  {likedCount}
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="text-white hover:text-orange-400 text-2xl"
            >
              <CiShoppingCart />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
