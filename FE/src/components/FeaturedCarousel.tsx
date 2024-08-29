import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Chair, Sofa } from "@/typings/types";
import ProductCard from "./ProductCard";

type FeaturedCarouselProps = {
  products: (Sofa | Chair)[];
};

const FeaturedCarousel = ({ products }: FeaturedCarouselProps) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-sm md:max-w-5xl mx-auto"
    >
      <CarouselContent className="flex items-stretch">
        {products.map((product) => (
          <CarouselItem
            key={product._id}
            className="pl-2 md:pl-3 md:basis-1/4 h-[300px]"
          >
            <ProductCard variant="carousel" key={product._id} product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant={"ghost"} />
      <CarouselNext variant={"ghost"} />
    </Carousel>
  );
};

export default FeaturedCarousel;
