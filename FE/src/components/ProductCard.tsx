import { Product } from "@/typings/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="border-none flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{product.name.toUpperCase()}</CardTitle>
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
