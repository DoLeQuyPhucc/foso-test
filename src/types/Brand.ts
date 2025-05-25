export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string;
  country: string;
  isActive: boolean;
  createdAt: string;
}

export type BrandsResponse = Brand[];
