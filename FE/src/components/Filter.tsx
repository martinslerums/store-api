import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useState } from "react";

import { FaSearch } from "react-icons/fa";


const Filter = () => {

  const productTypes = [
    { name: "All products", searchQuery: "" },
    { name: "Sofas", searchQuery: "sofa" },
    { name: "Chairs", searchQuery: "chair" },
    { name: "Tables", searchQuery: "table" },
  ];

  const handleProductType = (type: string) => {
    const currentUrl = new URL(window.location.href);

    if (type) {
      currentUrl.searchParams.set("type", type);
    } else {
      currentUrl.searchParams.delete("type");
    }

    window.history.pushState({}, "", currentUrl);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  
  const [productName, setProductName] = useState("")

  const handleProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  };

  const handleProductName = (name: string) => {
    const currentUrl = new URL(window.location.href);

    if (name) {
      currentUrl.searchParams.set("name", name);
    } else {
      currentUrl.searchParams.delete("name");
    }

    // Update browser's URL without reloading
    window.history.pushState({}, "", currentUrl);
    
    // Dispatch a popstate event to notify the application of the URL change
    window.dispatchEvent(new PopStateEvent("popstate"));
  };



  return (
    <div className="border-orange-900 border h-full w-full p-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Products</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {productTypes.map((type) => (
              <Button
                key={type.name}
                variant="link"
                onClick={() => handleProductType(type.searchQuery)}
              >
                <span className="text-left w-full">{type.name}</span>
              </Button>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <br />
      <div className="flex">
        <Input
          type="text"
          placeholder="Find a product"
          value={productName}
          onChange={handleProductNameChange} 
        />
        <Button
          className="-ml-10"
          variant="ghost"
          type="button"
          size="icon"
          onClick={() => handleProductName(productName)}
        >
          <FaSearch />
        </Button>
      </div>
    </div>
  );
};

export default Filter;
