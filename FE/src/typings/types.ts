
export type GetProductsData = {
  //products: (Sofa | Product)[]; if array can contain both types.
  data: {
    products: Sofa [];
  }
  nbHits: number;
};

export type GetProductFilters = {
  featured?: boolean;
  company?: "ikea" | "mebeles1" | "caressa" | "marcos";
  type?: "sofa" | "table" | "chair";
  name?: string;
  sort?: string;
  fields?: string;
  numericFilters?: string;
  limit?: number;
  page?: number;
};

export type GetSofaFilters = {
  featured?: boolean;
  company?: "ikea" | "mebeles1" | "caressa" | "marcos";
  type?: "sofa" | "corner-sofa" | "bed";
  name?: string;
  color?: string
  seat_size?: number
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  material?: "leather" | "polyester" | "velvet" | "fabric";
  sort?: string;
  fields?: string;
  numericFilters?: string;
  limit?: number;
  page?: number;
};

export type Sofa = {
  _id: string,
  name: string;
  price: number;
  featured?: boolean;
  description: string;
  type: "sofa" | "corner-sofa" | "bed";
  material: "leather" | "polyester" | "velvet" | "fabric";
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  color: string;
  seat_size: number;
  rating?: number;
  company: "ikea" | "mebeles1" | "caressa" | "marcos";
  image: string;
  createdAt?: string;
};
