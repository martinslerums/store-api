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
    <header className="">
      <div className=" bg-slate-800">
        <div className="flex justify-between container">
          <p className="text-white">Visit our store at Somestreet 35b</p>
          <p className="text-white hover:text-orange-400">Contacts</p>
        </div>
      </div>
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
          
          <NavigationMenuList className="flex space-x-4">

            <NavigationMenuItem>

              <NavigationMenuTrigger className="cursor-pointer px-4 py-2 rounded-lg transition duration-200 ease-in-out ">
                Mēbeles
              </NavigationMenuTrigger>

              <NavigationMenuContent className="container flex flex-col">
                <Link to="/products">
                  <NavigationMenuLink className="text-gray-700 hover:underline py-1 text-lg w-full">
                    Dīvāni
                  </NavigationMenuLink>
                </Link>
                <Link to="#">
                  <NavigationMenuLink className="text-gray-700 hover:underline py-1 text-lg">
                    Krēsli
                  </NavigationMenuLink>
                </Link>
                <Link to="#">
                  <NavigationMenuLink className="text-gray-700 hover:underline py-1 text-lg">
                    Gultas
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuContent>
              
            </NavigationMenuItem>

            <NavigationMenuItem className="relative">
              <NavigationMenuTrigger className="cursor-pointer px-4 py-2 rounded-lg transition duration-200 ease-in-out">
                Virtuve
              </NavigationMenuTrigger>
              <NavigationMenuContent className="container absolute left-200 flex flex-col">
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
    </header>
  );
};

export default Navbar;

{
  /* <NavigationMenuItem>
<NavigationMenuTrigger>Virtuve</NavigationMenuTrigger>
<NavigationMenuContent>
  <Link to="#">
    <NavigationMenuLink className="text-gray-700 hover:text-orange-400">
      Documentation
    </NavigationMenuLink>
  </Link>
  <Link to="#">
    <NavigationMenuLink className="text-gray-700 hover:text-orange-400">
      Something
    </NavigationMenuLink>
  </Link>
  <Link to="#">
    <NavigationMenuLink className="text-gray-700 hover:text-orange-400">
      Something
    </NavigationMenuLink>
  </Link>
</NavigationMenuContent>
</NavigationMenuItem>
<NavigationMenuItem>
<NavigationMenuTrigger>Dārzs</NavigationMenuTrigger>
<NavigationMenuContent>
  <Link to="#">
    <NavigationMenuLink className="text-gray-700 hover:text-orange-400">
      Documentation
    </NavigationMenuLink>
  </Link>
  <Link to="#">
    <NavigationMenuLink className="text-gray-700 hover:text-orange-400">
      Something
    </NavigationMenuLink>
  </Link>
  <Link to="#">
    <NavigationMenuLink className="text-gray-700 hover:text-orange-400">
      Something
    </NavigationMenuLink>
  </Link>
</NavigationMenuContent>
</NavigationMenuItem> */
}
