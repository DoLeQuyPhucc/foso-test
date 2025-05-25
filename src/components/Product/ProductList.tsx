"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Product } from "@/types/Product";
import { Category } from "@/types/Categories";
import { Brand } from "@/types/Brand";
import { ProductService } from "@/services/ProductService";
import { CategoriesService } from "@/services/CategoriesService";
import { BrandService } from "@/services/BrandService";
import ProductCard from "./ProductCard";
import { ChevronDown, Filter, Loader2 } from "lucide-react";

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
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [activeTab, setActiveTab] = useState("relevant");

  // Lazy loading states
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 12; // Số sản phẩm load mỗi lần

  // Ref for intersection observer
  const loadMoreRef = useRef<HTMLDivElement>(null);

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

  // Filter tabs
  const filterTabs = [
    { label: "Liên quan", value: "relevant" },
    { label: "Bán chạy", value: "bestseller" },
    { label: "Mới nhất", value: "newest" },
    { label: "Nổi bật", value: "featured" },
    { label: "Giá: Thấp - Cao", value: "price", hasDropdown: true },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products, sortBy]);

  // Reset displayed products when filtered products change
  useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
    loadInitialProducts();
  }, [filteredProducts]);

  // Intersection Observer for auto-loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loadingMore) {
          loadMoreProducts();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px", // Load khi còn cách 100px
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, loadingMore, filteredProducts]);

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

  const loadInitialProducts = useCallback(() => {
    const initialProducts = filteredProducts.slice(0, ITEMS_PER_PAGE);
    setDisplayedProducts(initialProducts);
    setHasMore(filteredProducts.length > ITEMS_PER_PAGE);
  }, [filteredProducts]);

  const loadMoreProducts = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    // Simulate network delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    const nextPage = currentPage + 1;
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const newProducts = filteredProducts.slice(startIndex, endIndex);

    if (newProducts.length > 0) {
      setDisplayedProducts((prev) => [...prev, ...newProducts]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < filteredProducts.length);
    } else {
      setHasMore(false);
    }

    setLoadingMore(false);
  }, [currentPage, filteredProducts, loadingMore, hasMore]);

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
      <div className="w-full mx-auto px-[10%] py-8">
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
    <div className="w-full mx-auto px-[10%] py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Filters */}
        <div className="space-y-0">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-800">Bộ lọc</h2>
          </div>

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
          <div className="flex justify-between items-center gap-6 mb-6">
            {/* Left side - Title and count */}
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900">
                Danh sách sản phẩm
              </h1>
              <span className="text-sm text-gray-500">
                ({displayedProducts.length}/{filteredProducts.length} sản phẩm)
              </span>
            </div>

            {/* Right side - Filter tabs */}
            <div className="flex items-center gap-6 text-sm">
              <div className="text-sm text-gray-600">Sắp xếp theo</div>
              {filterTabs.map((tab) => (
                <div
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex items-center gap-1 cursor-pointer pb-1 transition-colors ${
                    activeTab === tab.value
                      ? "text-blue-600 font-medium border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.hasDropdown && (
                    <ChevronDown className="w-3 h-3 text-gray-400" />
                  )}
                </div>
              ))}
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Loading More Indicator */}
              {hasMore && (
                <div
                  ref={loadMoreRef}
                  className="flex justify-center items-center py-8"
                >
                  {loadingMore ? (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Đang tải thêm sản phẩm...</span>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm">
                      Cuộn xuống để xem thêm sản phẩm
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
