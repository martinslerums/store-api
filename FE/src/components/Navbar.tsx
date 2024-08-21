import { Link } from "react-router-dom";
import { CiHeart, CiShoppingCart } from "react-icons/ci";

const Navbar = () => {
  return (
    <header className="bg-gray-800 p-4">
      <nav className="flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/path-to-your-logo.png" alt="Logo" className="h-10 w-auto" />
        </Link>
        <ul className="flex space-x-4 items-center">
          <li>
            <Link to="/products" className="text-white font-bold hover:text-orange-400">Products</Link>
          </li>
          <li>
            <Link to="/register" className="text-white font-bold hover:text-orange-400">Register</Link>
          </li>
          <li>
            <Link to="/liked" className="text-white hover:text-orange-400 text-2xl">
              <CiHeart />
            </Link>
          </li>
          <li>
            <Link to="/cart" className="text-white hover:text-orange-400 text-2xl">
              <CiShoppingCart />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
