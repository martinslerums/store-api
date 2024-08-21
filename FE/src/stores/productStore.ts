import { create } from "zustand";

type ProductStore = {
  type?: "sofa" | "chair" | "table";
  setType: (type?: "sofa" | "chair" | "table") => void;
  name?: string;
  setName: (name?: string) => void;
  company?: "ikea" | "liddy" | "caressa" | "marcos";
  setCompany: (company?: "ikea" | "liddy" | "caressa" | "marcos") => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  type: undefined,
  setType: (type) => set({ type }),
  name: undefined,
  setName: (name) => set({ name }),
  company: undefined,
  setCompany: (company) => set({ company }),
}));
