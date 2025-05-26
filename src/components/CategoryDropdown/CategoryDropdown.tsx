import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Pill,
  Activity,
  Zap,
  Stethoscope,
  Coffee,
  Brain,
  Sparkles,
  Heart,
  Apple,
} from "lucide-react";
import { Category } from "@/types/Categories";
import { Product } from "@/types/Product";
import { CategoriesService } from "@/services/CategoriesService";
import { ProductService } from "@/services/ProductService";
import ProductCard from "@/components/Product/ProductCard";

interface CategoryWithIcon extends Category {
  icon: React.ReactNode;
}

// Helper function to get icon for category
const getCategoryIcon = (categoryName: string): React.ReactNode => {
  const iconMapping: Record<string, React.ReactNode> = {
    vitamin: <Pill className="w-5 h-5" />,
    "sinh lý": <Activity className="w-5 h-5" />,
    "cải thiện": <Zap className="w-5 h-5" />,
    "hỗ trợ điều trị": <Stethoscope className="w-5 h-5" />,
    "tiêu hóa": <Coffee className="w-5 h-5" />,
    "thần kinh": <Brain className="w-5 h-5" />,
    "làm đẹp": <Sparkles className="w-5 h-5" />,
    "tim mạch": <Heart className="w-5 h-5" />,
    "dinh dưỡng": <Apple className="w-5 h-5" />,
  };

  const lowerName = categoryName.toLowerCase();

  // Find matching icon based on keywords in category name
  for (const [key, icon] of Object.entries(iconMapping)) {
    if (lowerName.includes(key)) {
      return icon;
    }
  }

  // Default icon
  return <Pill className="w-5 h-5" />;
};

interface CategoryDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoryDropdown({
  isOpen,
  onClose,
}: CategoryDropdownProps) {
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [categories, setCategories] = useState<CategoryWithIcon[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch data when dropdown opens for the first time
  useEffect(() => {
    if (isOpen && categories.length === 0) {
      fetchData();
    }
  }, [isOpen, categories.length]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch categories
      const categoriesData = await CategoriesService.getActiveCategories();
      const categoriesWithIcons: CategoryWithIcon[] = categoriesData.map(
        (category) => ({
          ...category,
          icon: getCategoryIcon(category.name),
        })
      );
      setCategories(categoriesWithIcons);

      // Set first category as selected
      if (categoriesWithIcons.length > 0) {
        setSelectedCategory(categoriesWithIcons[0].id);
      }

      // Fetch featured products (limit to 5)
      const featuredData = await ProductService.getFeaturedProducts(5);
      setFeaturedProducts(featuredData);

      // Fetch random products for "best selling" section
      const randomProducts = await ProductService.getRandomProducts(5);
      setBestSellingProducts(randomProducts);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-200 z-50 max-h-[70vh] overflow-hidden"
      onMouseLeave={() => onClose()}
    >
      <div className="mx-auto px-[5%] md:px-[10%] py-4">
        <div className="flex gap-4 h-full">
          {/* Sidebar Categories */}
          <div className="w-64 bg-gray-50 rounded-lg p-3 flex-shrink-0">
            {loading ? (
              <div className="space-y-2">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="flex items-center gap-3 p-3">
                      <div className="w-5 h-5 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded flex-1"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-100 text-blue-600"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                    onMouseEnter={() => setSelectedCategory(category.id)}
                  >
                    <div
                      className={`${
                        selectedCategory === category.id
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {category.icon}
                    </div>
                    <span className="text-xs font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Featured Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 rounded-lg p-3">
                      <div className="w-12 h-12 bg-gray-300 rounded-lg mb-2 mx-auto"></div>
                      <div className="h-3 bg-gray-300 rounded mx-auto w-3/4"></div>
                    </div>
                  </div>
                ))
              ) : featuredProducts.length > 0 ? (
                <>
                  {featuredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-white rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                          <Image
                            src={product.thumbnail}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <span
                          className="text-xs font-medium text-gray-700 overflow-hidden text-ellipsis"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical" as const,
                          }}
                        >
                          {product.name}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* See More Button */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex flex-col items-center justify-center text-center h-full">
                      <div className="w-12 h-12 bg-white rounded-lg mb-2 flex items-center justify-center">
                        <span className="text-lg text-gray-400">⋯</span>
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        Xem thêm
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="col-span-full text-center text-gray-500 py-8">
                  Không có sản phẩm nổi bật nào
                </div>
              )}
            </div>

            {/* Best Selling Section */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-800">
                  Bán chạy nhất
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1">
                  Xem tất cả
                  <span>→</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {loading ? (
                  [...Array(5)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 rounded-lg p-2">
                        <div className="aspect-square bg-gray-300 rounded-lg mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded mb-1"></div>
                        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))
                ) : bestSellingProducts.length > 0 ? (
                  bestSellingProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      className="h-auto"
                      showBuyButton={false}
                      compact={true}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500 py-8">
                    Không có sản phẩm bán chạy nào
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
