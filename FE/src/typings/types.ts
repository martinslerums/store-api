export type Product = {
  _id: string;
  name: string;
  price: number;
  featured?: boolean;
  description: string;
  company: "ikea" | "liddy" | "caressa" | "marcos";
  type: "sofa" | "table" | "chair";
  rating?: number;
  image?: string;
  createdAt?: string;
};

export type GetProductsData = {
  products: Product[];
  nbHits: number;
};

export type GetProductFilters = {
  featured?: boolean;
  company?: "ikea" | "liddy" | "caressa" | "marcos";
  type?: "sofa" | "table" | "chair";
  name?: string;
  sort?: string;
  fields?: string;
  numericFilters?: string;
  limit?: number;
  page?: number;
};
