import { Brand, BrandsResponse } from "@/types/Brand";
import { categoryService } from "@/api/axiosInstance";

export class BrandService {
  private static readonly ENDPOINT = "/brands";

  /**
   * Lấy danh sách tất cả brands
   */
  static async getAllBrands(): Promise<BrandsResponse> {
    try {
      const response = await categoryService.get<BrandsResponse>(this.ENDPOINT);
      return response.data;
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  }

  /**
   * Lấy brand theo ID
   */
  static async getBrandById(id: number): Promise<Brand> {
    try {
      const response = await categoryService.get<Brand>(
        `${this.ENDPOINT}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching brand with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Lấy brand theo slug
   */
  static async getBrandBySlug(slug: string): Promise<Brand> {
    try {
      const response = await categoryService.get<Brand>(
        `${this.ENDPOINT}/slug/${slug}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching brand with slug ${slug}:`, error);
      throw error;
    }
  }

  /**
   * Lấy danh sách brands đang active
   */
  static async getActiveBrands(): Promise<BrandsResponse> {
    try {
      const response = await categoryService.get<BrandsResponse>(
        `${this.ENDPOINT}?isActive=true`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching active brands:", error);
      throw error;
    }
  }
}
