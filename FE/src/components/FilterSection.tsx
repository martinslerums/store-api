import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type FilterSectionProps<T extends string | number> = {
  title: string;
  items: T[];
  selectedItem: T | undefined;
  onSelect: (item: T | undefined) => void;
};

const FilterSection = <T extends string | number>({
  title,
  items,
  selectedItem,
  onSelect,
}: FilterSectionProps<T>) => (
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
                id={`checkbox-${item}`}
                checked={selectedItem === item}
                onCheckedChange={(checked) => onSelect(checked ? item : undefined)}
              />
              <span className="ml-3">{item}</span>
            </label>
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export default FilterSection;
