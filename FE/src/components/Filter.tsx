import useProductFilters from "@/hooks/useProductFilters";
import FilterSection from "./FilterSection";
import { AllCompanies, AllMaterials, AllTypes, ProductFilters } from "@/typings/types";

type FilterProps = {
  filterValues?: {
    uniqueCompanies?: AllCompanies[];
    uniqueColors?: string[];
    uniqueMaterials?: AllMaterials[];
    uniqueTypes?: AllTypes[];
  };
};

const Filter = ({ filterValues }: FilterProps) => {
  const { uniqueCompanies, uniqueColors, uniqueMaterials, uniqueTypes } = filterValues || {};
  const { company, color, material, type, setFilters } = useProductFilters();

  const handleFilterSelect = <T,>(filterKey: keyof ProductFilters, selectedValue: T | undefined) => {
    setFilters({ [filterKey]: selectedValue });
  };

  return (
    <div className="h-full w-full max-w-60 p-4 space-y-4">
      {uniqueCompanies && (
        <FilterSection<AllCompanies>
          title="Ražotājs"
          items={uniqueCompanies}
          selectedItem={company}
          onSelect={(selected) => handleFilterSelect("company", selected)}
        />
      )}
      {uniqueTypes && (
        <FilterSection<AllTypes>
          title="Tips"
          items={uniqueTypes}
          selectedItem={type}
          onSelect={(selected) => handleFilterSelect("type", selected)}
        />
      )}
      {uniqueMaterials && (
        <FilterSection<AllMaterials>
          title="Materiāls"
          items={uniqueMaterials}
          selectedItem={material}
          onSelect={(selected) => handleFilterSelect("material", selected)}
        />
      )}
      {uniqueColors && (
        <FilterSection<string>
          title="Krāsa"
          items={uniqueColors}
          selectedItem={color}
          onSelect={(selected) => handleFilterSelect("color", selected)}
        />
      )}
    </div>
  );
};

export default Filter;
