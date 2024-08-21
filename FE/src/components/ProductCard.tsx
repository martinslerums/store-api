import { useState, useEffect } from "react";
import { Product } from "@/typings/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaRegHeart, FaHeart } from "react-icons/fa";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    const likedItems = JSON.parse(localStorage.getItem("likedItems") || "[]");
    if (likedItems.includes(product._id)) {
      setLiked(true);
    }
  }, [product._id]);

  const handleLiked = (id: string) => {
    let likedItems = JSON.parse(localStorage.getItem("likedItems") || "[]");

    console.log("LikedItems from handleLiked: ", likedItems)

    if (likedItems.includes(id)) {
      likedItems = likedItems.filter((itemId: string) => itemId !== id);
      setLiked(false);
    } else {
      likedItems.push(id);
      setLiked(true);
    }

    localStorage.setItem("likedItems", JSON.stringify(likedItems));
  };

  return (
    <Card className="border-none flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {product.name.toUpperCase()}
          {liked ? (
            <FaHeart
              className="cursor-pointer text-red-500"
              onClick={() => handleLiked(product._id)}
            />
          ) : (
            <FaRegHeart
              className="cursor-pointer"
              onClick={() => handleLiked(product._id)}
            />
          )}
        </CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <img src={product.image} alt={product.name} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span>${product.price}</span>
        <span>{product.rating}</span>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
