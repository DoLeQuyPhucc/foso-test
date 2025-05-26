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
   * @param limit - Maximum number of featured products to return
   * @returns Promise<ProductList>
   */
  static async getFeaturedProducts(limit?: number): Promise<ProductList> {
    try {
      const response = await productsService.get<ProductList>(
        "/products?isFeatured=true"
      );
      const products = response.data;
      return limit ? products.slice(0, limit) : products;
    } catch (error) {
      console.error("Error fetching featured products:", error);
      throw error;
    }
  }

  /**
   * Get random products from all products
   * @param count - Number of random products to return (default 5)
   * @returns Promise<ProductList>
   */
  static async getRandomProducts(count: number = 5): Promise<ProductList> {
    try {
      const allProducts = await this.getProductList();
      
      // Fisher-Yates shuffle algorithm for better randomness
      const shuffled = [...allProducts];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      return shuffled.slice(0, Math.min(count, shuffled.length));
    } catch (error) {
      console.error("Error fetching random products:", error);
      throw error;
    }
  }
}
