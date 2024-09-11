import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import { Input } from "./ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

type SliderFilterProps = {
  title: string;
};

const SliderFilter = ({ title }: SliderFilterProps) => {
  const [sliderValues, setSliderValues] = useState([0, 10000]);

  const handleChange = (newValue) => {
    setSliderValues(newValue);
  };

  const handleLowerInputChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setSliderValues([Math.min(value, sliderValues[1]), sliderValues[1]]);
  };

  const handleUpperInputChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setSliderValues([sliderValues[0], Math.max(value, sliderValues[0])]);
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
                value={sliderValues[0]}
                onChange={handleLowerInputChange}
                min={0}
                max={sliderValues[1]}
              />
              <span className="font-semibold text-lg text-nowrap">€ -</span>
            </div>
            <div className="flex items-center gap-1">
              <Input
                className="max-w-16 focus-visible:ring-0 focus-visible:ring-offset-0 font-semibold"
                type="text"
                value={sliderValues[1]}
                onChange={handleUpperInputChange}
                min={sliderValues[0]}
                max={10000}
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
