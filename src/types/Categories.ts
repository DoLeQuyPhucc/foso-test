export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: string;
}

export type CategoriesResponse = Category[];
