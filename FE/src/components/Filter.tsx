import FilterSection from "./FilterSection";
import { useProductStore } from "@/stores/productStore";
import { AllCompanies, AllMaterials, AllTypes } from "@/typings/types";

type FilterProps = {
  filterValues?: {
    uniqueCompanies?: string []
    uniqueColors?: string []
    uniqueMaterials?: string []
    uniqueTypes?: string []
  }
}

const Filter = ({filterValues}: FilterProps) => {
   const { uniqueCompanies, uniqueColors, uniqueMaterials, uniqueTypes } = filterValues || {};


  const {
    company,
    setCompany,
    material,
    setMaterial,
    color,
    setColor,
    type,
    setType,
  } = useProductStore();

  return (
    <div className="h-full w-full p-4 space-y-4">
      {uniqueCompanies && (
        <FilterSection<AllCompanies>
          title="Ražotājs"
          items={uniqueCompanies as AllCompanies[]}
          selectedItem={company}
          onSelect={setCompany}
        />
      )}
      {uniqueTypes && (
        <FilterSection<AllTypes>
          title="Tips"
          items={uniqueTypes as AllTypes[]}
          selectedItem={type}
          onSelect={setType}
        />
      )}
      {uniqueMaterials && (
        <FilterSection<AllMaterials>
          title="Materiāls"
          items={uniqueMaterials as AllMaterials[]}
          selectedItem={material}
          onSelect={setMaterial}
        />
      )}
      {uniqueColors && (
        <FilterSection<string>
          title="Krāsa"
          items={uniqueColors}
          selectedItem={color}
          onSelect={setColor}
        />
      )}
    </div>
  );
};

export default Filter;
