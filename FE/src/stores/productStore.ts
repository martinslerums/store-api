import { AllCompanies, AllMaterials, AllTypes } from "@/typings/types";
import { create } from "zustand";

type ProductStore = {
  name?: string;
  setName: (name?: string) => void;
  type?: AllTypes;
  setType: (type?: AllTypes) => void;
  company?: AllCompanies;
  setCompany: (company?: AllCompanies) => void;
  material?: AllMaterials;
  setMaterial: (material?: AllMaterials) => void;
  color?: string;
  setColor: (color?: string) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  name: undefined,
  setName: (name) => set({ name }),
  type: undefined,
  setType: (type) => set({ type }),
  company: undefined,
  setCompany: (company) => set({ company }),
  material: undefined,
  setMaterial: (material) => set({ material }),
  color: undefined,
  setColor: (color) => set({ color }),
}));
