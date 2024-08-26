import { Sofa } from "@/typings/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WishlistHart from "./WishlistHart";

type ProductCardProps = {
  product: Sofa;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="border-none flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {product.name.toUpperCase()}
          <WishlistHart id={product._id} />
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
