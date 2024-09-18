import { Link } from "react-router-dom";
import { IoReturnDownBack } from "react-icons/io5";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-2xl font-medium text-gray-800 mb-6">
          Page Not Found
        </p>
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-700 flex items-center justify-center space-x-2"
        >
          <IoReturnDownBack />
          <span> Go to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
