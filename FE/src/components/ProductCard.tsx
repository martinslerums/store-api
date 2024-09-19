import { Chair, Sofa } from "@/typings/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WishlistHart from "./WishlistHart";
import AddItemCart from "./AddItemCart";

type ProductCardProps = {
  product: Sofa | Chair;
  variant?: "default" | "carousel";
};

const ProductCard = ({ product, variant = "default" }: ProductCardProps) => {
  const isCarousel = variant === "carousel";

  return (
    <Card
      className={`p-2 flex flex-col justify-between rounded-sm border-none text-card-foreground shadow-sm ${
        isCarousel && "max-h-[290px] h-full transition-transform transform hover:scale-105 hover:shadow-x p-1"}`}
    >
      <div className="flex-1 flex flex-col justify-between">
        <CardHeader
          className={`mb-2  ${isCarousel && "border-none pb-0" }`}
        >
          <div className="flex justify-between items-center">
            <CardTitle
              className={`${
                isCarousel ? "text-lg sm:text-xl font-medium" : "text-xl font-bold"
              } text-gray-800`}
            >
              
              {product.name.toUpperCase()}
            
            </CardTitle>
            {!isCarousel && <WishlistHart id={product._id} />}
          </div>

          {!isCarousel && (
            <CardDescription className="text-gray-600 text-sm">
              {product.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent
          className="border-t border-b border-gray-100"
        >
          <div
            className={`w-full h-full overflow-hidden rounded-md mb-4 flex justify-center`}
          >
            <img
              src={product.image}
              alt={product.name}
              className={`object-contain h-48 ${isCarousel && 'h-32'}`}
            />
          </div>
        </CardContent>
      </div>

      <CardFooter
        className={`flex ${
          isCarousel ? "justify-between items-center text-sm" : "justify-between items-center pt-2"
        }`}
      >
        {isCarousel ? (
          <>
            <span
              className={`text-base ${
                isCarousel ? "font-medium" : "font-semibold"
              } text-gray-800`}
            >
              ${product.price}
            </span>
            <span className="text-yellow-500 flex items-center">
              {product.rating}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4 ml-1"
              >
                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27z" />
              </svg>
            </span>
            <WishlistHart id={product._id} />
          </>
        ) : (
          <div className="flex flex-col">
            <div>
              <span
                className={`text-lg ${
                  isCarousel ? "sm:text-base" : "font-semibold"
                } text-gray-800`}
              >
                ${product.price}
              </span>
              <span className="text-yellow-500 flex items-center">
                {product.rating}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 ml-1"
                >
                  <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27z" />
                </svg>
              </span>
            </div>
            <AddItemCart id={product._id} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
