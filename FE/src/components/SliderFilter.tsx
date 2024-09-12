import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import useProductFilters from "@/hooks/useProductFilters";
import { useDebounce } from "@/hooks/useDebounce";

type SliderFilterProps = {
  title: string;
};

const SliderFilter = ({ title }: SliderFilterProps) => {
  const [sliderValues, setSliderValues] = useState<[number, number]>([0, 10000]);
  const [tempValues, setTempValues] = useState<[string, string]>(["0", "10000"]);
  const { setFilters } = useProductFilters();

  const debouncedPriceRange = useDebounce(sliderValues, 1000);

  useEffect(() => {
    const [min, max] = debouncedPriceRange;
    const filters: { price?: string[] } = {};

    if (min > 0 || max < 10000) {
      filters.price = [];
      if (min > 0) filters.price.push(`gte-${min}`);
      if (max < 10000) filters.price.push(`lte-${max}`);
    }

    if (filters.price) {
      setFilters(filters);
    } 
  }, [debouncedPriceRange, setFilters]);

  useEffect(() => {
    setTempValues([sliderValues[0].toString(), sliderValues[1].toString()]);
  }, [sliderValues]);

  const handleChange = (newValue: number | number[]) => {
    setSliderValues(newValue as [number, number]);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Enter") {
      const inputValue = parseInt(tempValues[index], 10) || 0;
      const newValues = [...sliderValues];

      if (index === 0) {
        newValues[0] = Math.min(inputValue, sliderValues[1]);
      } else {
        newValues[1] = Math.max(inputValue, sliderValues[0]);
      }

      setSliderValues(newValues as [number, number]);
    }
  };

  const handleInputChange = (value: string, index: number) => {
    setTempValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues as [string, string];
    });
  };

  return (
    <Accordion type="single" collapsible className="shadow-sm p-2">
      <AccordionItem className="border-b-0" value={title}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 w-full max-w-44 mx-auto">
          <div className="flex justify-between gap-2 my-2">
            <div className="flex items-center gap-1">
              <Input
                className="max-w-16 focus-visible:ring-0 focus-visible:ring-offset-0 font-semibold"
                type="text"
                value={tempValues[0]}
                onChange={(e) => handleInputChange(e.target.value, 0)}
                onKeyDown={(e) => handleKeyDown(e, 0)}
              />
              <span className="font-semibold text-lg text-nowrap">€ -</span>
            </div>
            <div className="flex items-center gap-1">
              <Input
                className="max-w-16 focus-visible:ring-0 focus-visible:ring-offset-0 font-semibold"
                type="text"
                value={tempValues[1]}
                onChange={(e) => handleInputChange(e.target.value, 1)}
                onKeyDown={(e) => handleKeyDown(e, 1)}
              />
              <span className="font-semibold text-lg text-nowrap">€</span>
            </div>
          </div>
          <Slider
            allowCross={false}
            range
            min={0}
            max={10000}
            value={sliderValues}
            onChange={handleChange}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SliderFilter;
