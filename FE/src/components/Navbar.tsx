import { Link } from "react-router-dom";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { useEffect, useState } from "react";
import useWishlistStore from "@/stores/wishlistStore";

import SearchBox from "./SearchBox";
import shopLogo from "../assets/logo.svg";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const { likedItems, initializeLikedItems } = useWishlistStore();
  const [likedCount, setLikedCount] = useState(likedItems.length);

  useEffect(() => {
    initializeLikedItems();
  }, [initializeLikedItems]);

  useEffect(() => {
    setLikedCount(likedItems.length);
  }, [likedItems]);

  return (
    <header className="sticky top-0 bg-white z-10 shadow-md">
      <div >
        <div className="container flex justify-between py-8">
          <div>SOCIAL MEDIA LINKS</div>

          <Link to="/" className="flex items-center">
            <img src={shopLogo} alt="Logo" className="h-10 w-auto" />
          </Link>

          <div className="flex items-center gap-4 relative">
            <SearchBox />

            <Link
              to="/wishlist"
              className="hover:text-orange-400 text-2xl relative"
            >
              <CiHeart size={30} />
              {likedCount > 0 && (
                <span className="absolute -top-1 -right-3 bg-red-500 rounded-full h-5 w-5 text-xs flex items-center justify-center">
                  {likedCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="hover:text-orange-400 text-2xl">
              <CiShoppingCart size={30} />
            </Link>
          </div>
        </div>
        <div>
          <NavigationMenu className="mx-auto">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="cursor-pointer px-4 py-2 rounded-lg transition duration-200 ease-in-out hover:bg-gray-200">
                  Mēbeles
                </NavigationMenuTrigger>

                <NavigationMenuContent className="flex flex-col px-2 w-full">
                  <NavigationMenuLink asChild>
                    <Link
                      to="/products/sofas"
                      className="block px-4 py-2 text-base font-semibold hover:bg-gray-100"
                    >
                      Dīvāni
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/products/chairs"
                      className="block px-4 py-2 text-base hover:bg-gray-100"
                    >
                      Krēsli
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-base hover:bg-gray-100"
                    >
                      Gultas
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="cursor-pointer px-4 py-2 rounded-lg transition duration-200 ease-in-out">
                  Virtuve
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col px-2 w-full">
                  <Link to="#">
                    <NavigationMenuLink className="text-gray-700 hover:underline py-1 text-lg">
                      Documentation
                    </NavigationMenuLink>
                  </Link>
                  <Link to="#">
                    <NavigationMenuLink className="text-gray-700 hover:underline py-1 text-lg">
                      Something
                    </NavigationMenuLink>
                  </Link>
                  <Link to="#">
                    <NavigationMenuLink className="text-gray-700 hover:underline py-1 text-lg">
                      Something
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
