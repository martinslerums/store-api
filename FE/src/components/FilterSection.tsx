import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { filtersMap } from "@/maps/filtersMap";
import { useEffect } from "react";

type FilterSectionProps<T extends string | number> = {
  title: string;
  items: T[];
  selectedOptions: T[];
  onSelect: (item: T, isChecked: boolean) => void;
};

const FilterSection = <T extends string | number>({
  title,
  items,
  selectedOptions,
  onSelect,
}: FilterSectionProps<T>) => {

  useEffect(() => {
    console.log("Component Mounted")
  }, [])

  return (
    <Accordion type="single" collapsible className="shadow-sm p-2">
      <AccordionItem className="border-b-0" value={title}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item} className="flex items-center">
              <label
                htmlFor={`checkbox-${item}`}
                className="flex items-center cursor-pointer"
              >
                <Checkbox
                  hideCheck
                  className="h-3 w-3 rounded-full"
                  id={`checkbox-${item}`}
                  checked={selectedOptions.includes(item)}
                  onCheckedChange={(checked: boolean) =>
                    onSelect(item, checked)
                  }
                />
                <span className="ml-3 font-semibold">
                  {filtersMap[item] || item}
                </span>
              </label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterSection;
