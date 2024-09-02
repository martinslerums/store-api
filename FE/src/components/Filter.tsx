import useGetFilters from "@/hooks/useGetFilters";
import FilterSection from "./FilterSection";
import { useProductStore } from "@/stores/productStore";
import { AllCompanies, AllMaterials, AllTypes } from "@/typings/types";

const Filter = () => {
  const { data } = useGetFilters();
  const { uniqueCompanies, uniqueColors, uniqueMaterials, uniqueTypes } =
    data || {};

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

  const filters = [company, material, color, type]

  console.table(filters);

  return (
    <div className="h-full w-full p-4">
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
