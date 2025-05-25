"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/types/Product";
import { Category } from "@/types/Categories";
import { Brand } from "@/types/Brand";
import { ProductService } from "@/services/ProductService";
import { CategoriesService } from "@/services/CategoriesService";
import { BrandService } from "@/services/BrandService";
import ProductCard from "./ProductCard";
import { ChevronDown, Grid3X3, List } from "lucide-react";

interface FilterState {
  categories: number[];
  brands: number[];
  priceRange: string;
  years: number[];
  origins: string[];
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("default");

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: "",
    years: [],
    origins: [],
  });

  // Price ranges
  const priceRanges = [
    { label: "Dưới 5 triệu", value: "0-5000000" },
    { label: "5 - 10 triệu", value: "5000000-10000000" },
    { label: "10 - 20 triệu", value: "10000000-20000000" },
    { label: "20 - 30 triệu", value: "20000000-30000000" },
    { label: "Trên 30 triệu", value: "30000000-999999999" },
  ];

  // Years
  const years = [2024, 2023, 2022, 2021, 2020];

  // Origins
  const origins = [
    "Việt Nam",
    "Trung Quốc",
    "Hàn Quốc",
    "Nhật Bản",
    "Mỹ",
    "Đức",
  ];

  // Sort options
  const sortOptions = [
    { label: "Mặc định", value: "default" },
    { label: "Giá thấp đến cao", value: "price-asc" },
    { label: "Giá cao đến thấp", value: "price-desc" },
    { label: "Tên A-Z", value: "name-asc" },
    { label: "Tên Z-A", value: "name-desc" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products, sortBy]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData, brandsData] = await Promise.all([
        ProductService.getProductList(),
        CategoriesService.getActiveCategories(),
        BrandService.getActiveBrands(),
      ]);

      setProducts(productsData || []);
      setCategories(categoriesData);
      setBrands(brandsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.categoryId)
      );
    }

    // Filter by brands
    if (filters.brands.length > 0) {
      filtered = filtered.filter((product) =>
        filters.brands.includes(product.brandId)
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (
    filterType: keyof FilterState,
    value: string | number,
    checked: boolean
  ) => {
    setFilters((prev) => {
      const newFilters = { ...prev };

      if (filterType === "priceRange") {
        newFilters.priceRange = checked ? (value as string) : "";
      } else {
        const currentArray = newFilters[filterType] as (string | number)[];
        if (checked) {
          newFilters[filterType] = [...currentArray, value] as any;
        } else {
          newFilters[filterType] = currentArray.filter(
            (item) => item !== value
          ) as any;
        }
      }

      return newFilters;
    });
  };

  const FilterSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <h3 className="font-semibold text-gray-800 mb-3">{title}</h3>
      {children}
    </div>
  );

  const CheckboxItem = ({
    label,
    checked,
    onChange,
  }: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );

  if (loading) {
    return (
      <div className="w-full px-[20%] py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="lg:col-span-3 space-y-4">
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-[20%] py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Filters */}
        <div className="space-y-0">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Bộ lọc</h2>

          {/* Categories Filter */}
          <FilterSection title="Danh mục sản phẩm">
            <div className="space-y-2">
              {categories.map((category) => (
                <CheckboxItem
                  key={category.id}
                  label={category.name}
                  checked={filters.categories.includes(category.id)}
                  onChange={(checked) =>
                    handleFilterChange("categories", category.id, checked)
                  }
                />
              ))}
            </div>
          </FilterSection>

          {/* Price Range Filter */}
          <FilterSection title="Khoảng giá">
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <CheckboxItem
                  key={range.value}
                  label={range.label}
                  checked={filters.priceRange === range.value}
                  onChange={(checked) =>
                    handleFilterChange("priceRange", range.value, checked)
                  }
                />
              ))}
            </div>
          </FilterSection>

          {/* Brands Filter */}
          <FilterSection title="Thương hiệu">
            <div className="space-y-2">
              {brands.map((brand) => (
                <CheckboxItem
                  key={brand.id}
                  label={brand.name}
                  checked={filters.brands.includes(brand.id)}
                  onChange={(checked) =>
                    handleFilterChange("brands", brand.id, checked)
                  }
                />
              ))}
            </div>
          </FilterSection>

          {/* Years Filter */}
          <FilterSection title="Năm sản xuất">
            <div className="space-y-2">
              {years.map((year) => (
                <CheckboxItem
                  key={year}
                  label={year.toString()}
                  checked={filters.years.includes(year)}
                  onChange={(checked) =>
                    handleFilterChange("years", year, checked)
                  }
                />
              ))}
            </div>
          </FilterSection>

          {/* Origins Filter */}
          <FilterSection title="Xuất xứ">
            <div className="space-y-2">
              {origins.map((origin) => (
                <CheckboxItem
                  key={origin}
                  label={origin}
                  checked={filters.origins.includes(origin)}
                  onChange={(checked) =>
                    handleFilterChange("origins", origin, checked)
                  }
                />
              ))}
            </div>
          </FilterSection>
        </div>

        {/* Right Content - Product List */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                Hiển thị {filteredProducts.length} sản phẩm
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Không tìm thấy sản phẩm nào
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className={viewMode === "list" ? "flex space-x-4" : ""}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
