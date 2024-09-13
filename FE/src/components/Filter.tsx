import useProductFilters from "@/hooks/useProductFilters";
import FilterSection from "./FilterSection";
import {
  AllCompanies,
  AllMaterials,
  AllTypes,
  ProductFilters,
} from "@/typings/types";
import SliderFilter from "./SliderFilter";

type FilterProps = {
  filterValues?: {
    uniqueCompanies?: AllCompanies[];
    uniqueColors?: string[];
    uniqueMaterials?: AllMaterials[];
    uniqueTypes?: AllTypes[];
  };
};

const Filter = ({ filterValues }: FilterProps) => {
  const { uniqueCompanies, uniqueColors, uniqueMaterials, uniqueTypes } =
    filterValues || {};
  const { company, color, material, type, setFilters } = useProductFilters();

  const handleFilterSelect = ( filterKey: keyof ProductFilters,item: string,isChecked: boolean) => {
    let currentValues: string[] = [];

    switch (filterKey) {
      case "company":
        currentValues = company as AllCompanies[];
        break;
      case "color":
        currentValues = color as string[];
        break;
      case "material":
        currentValues = material as AllMaterials[];
        break;
      case "type":
        currentValues = type as AllTypes[];
        break;
      default:
        break;
    }

    const updatedValues = isChecked
      ? [...currentValues, item]
      : currentValues.filter((value) => value !== item);

    setFilters({ [filterKey]: updatedValues });
  };

  return (
    <div className="h-full w-full max-w-60 p-4 space-y-4">
      {uniqueCompanies && (
        <FilterSection<AllCompanies>
          title="Ražotājs"
          items={uniqueCompanies}
          selectedOptions={company || []}
          onSelect={(item, isChecked) =>
            handleFilterSelect("company", item, isChecked)
          }
        />
      )}
      {uniqueTypes && (
        <FilterSection<AllTypes>
          title="Tips"
          items={uniqueTypes}
          selectedOptions={type || []}
          onSelect={(item, isChecked) =>
            handleFilterSelect("type", item, isChecked)
          }
        />
      )}
      {uniqueMaterials && (
        <FilterSection<AllMaterials>
          title="Materiāls"
          items={uniqueMaterials}
          selectedOptions={material || []}
          onSelect={(item, isChecked) =>
            handleFilterSelect("material", item, isChecked)
          }
        />
      )}
      {uniqueColors && (
        <FilterSection<string>
          title="Krāsa"
          items={uniqueColors}
          selectedOptions={color || []}
          onSelect={(item, isChecked) =>
            handleFilterSelect("color", item, isChecked)
          }
        />
      )}
      <SliderFilter 
        title="Cena"
      />
    </div>
  );
};

export default Filter;
