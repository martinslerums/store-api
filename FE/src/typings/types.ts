export type GetProductsData<T> = {
  products: T;
  nbHits: number;
};

export type Sofa = {
  _id: string;
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

export type Chair = {
  _id: string;
  name: string;
  price: number;
  featured?: boolean;
  description?: string;
  type: "office-chair" | "dining-chair" | "lounge-chair" | "bar-chair";
  material: "leather" | "fabric" | "wood" | "metal";
  dimensions: {
    width: number;
    height: number;
    depth: number;
    seat_height: number;
  };
  color?: string;
  rating?: number;
  company: "ikea" | "mebeles1" | "berry" | "marcos";
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type GetProductFilters = {
  featured?: boolean;
  company?: AllCompanies;
  type?: AllTypes;
  name?: string;
  color?: string;
  seat_size?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  material?: AllMaterials;
  sort?: string;
  fields?: string;
  numericFilters?: string;
  limit?: number;
  page?: number;
};

export type AllProductsData = {
  sofas: Sofa[];
  chairs: Chair[];
};

export type ProductUniqueFilters = {
  uniqueCompanies?: string[];
  uniqueColors?: string[];
  uniqueTypes?: string[];
  uniqueMaterials?: string[];
};

type ExtractMaterialType<T> = T extends { material: infer M } ? M : never;
type ExtractCompanyType<T> = T extends { company: infer M } ? M : never;
type ExtractTypeType<T> = T extends { type: infer M } ? M : never;

export type AllMaterials = ExtractMaterialType<Sofa> | ExtractMaterialType<Chair>;
export type AllCompanies = ExtractCompanyType<Sofa> | ExtractCompanyType<Chair>;
export type AllTypes = ExtractTypeType<Sofa> | ExtractTypeType<Chair>;
