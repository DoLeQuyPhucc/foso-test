export interface ProductSpecifications {
  screen: string;
  ram: string;
  storage: string;
  battery: string;
  os: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  brandId: number;
  price: number;
  originalPrice: number;
  discount: number;
  discountType: string;
  images: string[];
  thumbnail: string;
  manufacturingYear: number;
  origin: string;
  description: string;
  specifications: ProductSpecifications;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type ProductList = Product[];
