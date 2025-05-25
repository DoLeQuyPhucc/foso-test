import { Category, CategoriesResponse } from "@/types/Categories";
import { categoryService } from "@/api/axiosInstance";

export class CategoriesService {
  private static readonly ENDPOINT = "/categories";

  /**
   * Lấy danh sách tất cả categories
   */
  static async getAllCategories(): Promise<CategoriesResponse> {
    try {
      const response = await categoryService.get<CategoriesResponse>(
        this.ENDPOINT
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  /**
   * Lấy category theo ID
   */
  static async getCategoryById(id: number): Promise<Category> {
    try {
      const response = await categoryService.get<Category>(
        `${this.ENDPOINT}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching category with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Lấy category theo slug
   */
  static async getCategoryBySlug(slug: string): Promise<Category> {
    try {
      const response = await categoryService.get<Category>(
        `${this.ENDPOINT}/slug/${slug}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching category with slug ${slug}:`, error);
      throw error;
    }
  }

  /**
   * Lấy danh sách categories đang active
   */
  static async getActiveCategories(): Promise<CategoriesResponse> {
    try {
      const response = await categoryService.get<CategoriesResponse>(
        `${this.ENDPOINT}?isActive=true`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching active categories:", error);
      throw error;
    }
  }
}
