import { create } from "zustand";

type ProductStore = {
  type?: "sofa" | "corner-sofa" | "bed";
  setType?: (type?: "sofa" | "corner-sofa" | "bed") => void;
  name?: string;
  setName?: (name?: string) => void;
  company?: "ikea" | "mebeles1" | "caressa" | "marcos";
  setCompany?: (company?: "ikea" | "mebeles1" | "caressa" | "marcos") => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  type: undefined,
  setType: (type) => set({ type }),
  name: undefined,
  setName: (name) => set({ name }),
  company: undefined,
  setCompany: (company) => set({ company }),
}));
