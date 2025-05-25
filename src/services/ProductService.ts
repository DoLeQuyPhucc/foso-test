import { productsService } from "../api/axiosInstance";
import { Product, ProductList } from "../types/Product";

export class ProductService {
  /**
   * Get list of all products
   * @returns Promise<ProductList>
   */
  static async getProductList(): Promise<ProductList> {
    try {
      const response = await productsService.get<ProductList>("/products");
      return response.data;
    } catch (error) {
      console.error("Error fetching product list:", error);
      throw error;
    }
  }

  /**
   * Get a single product by ID
   * @param id - Product ID
   * @returns Promise<Product>
   */
  static async getProductById(id: number): Promise<Product> {
    try {
      const response = await productsService.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get products by category
   * @param categoryId - Category ID
   * @returns Promise<ProductList>
   */
  static async getProductsByCategory(categoryId: number): Promise<ProductList> {
    try {
      const response = await productsService.get<ProductList>(
        `/products?categoryId=${categoryId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching products for category ${categoryId}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Get featured products
   * @returns Promise<ProductList>
   */
  static async getFeaturedProducts(): Promise<ProductList> {
    try {
      const response = await productsService.get<ProductList>(
        "/products?isFeatured=true"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching featured products:", error);
      throw error;
    }
  }
}
