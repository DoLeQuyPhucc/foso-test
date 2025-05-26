"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Product } from "@/types/Product";
import { Category } from "@/types/Categories";
import { Brand } from "@/types/Brand";
import { ProductService } from "@/services/ProductService";
import { CategoriesService } from "@/services/CategoriesService";
import { BrandService } from "@/services/BrandService";
import ProductCard from "./ProductCard";
import {
  ChevronDown,
  Filter,
  Loader2,
  X,
  SlidersHorizontal,
} from "lucide-react";

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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

  // Close mobile filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMobileFilterOpen &&
        !target.closest("[data-filter-sidebar]") &&
        !target.closest("[data-filter-button]")
      ) {
        setIsMobileFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileFilterOpen]);

  // Prevent body scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileFilterOpen]);

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
    <div className="border-b border-gray-200 pb-3 sm:pb-4 mb-3 sm:mb-4">
      <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">
        {title}
      </h3>
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
      <span className="text-xs sm:text-sm text-gray-700">{label}</span>
    </label>
  );

  // Count active filters
  const activeFiltersCount =
    filters.categories.length +
    filters.brands.length +
    (filters.priceRange ? 1 : 0) +
    filters.years.length +
    filters.origins.length;

  if (loading) {
    return (
      <div className="w-full mx-auto px-4 sm:px-6 md:px-[8%] lg:px-[10%] py-4 sm:py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
            <div className="space-y-4 hidden lg:block">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="lg:col-span-3 space-y-4">
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
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
    <div className="w-full mx-auto px-4 sm:px-6 md:px-[8%] lg:px-[10%] py-4 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">
            Danh sách sản phẩm
          </h1>
          <button
            className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            onClick={() => setIsMobileFilterOpen(true)}
            data-filter-button
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-medium">
              Bộ lọc {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </span>
          </button>
        </div>

        {/* Left Sidebar - Filters (Desktop) */}
        <div className="space-y-0 hidden lg:block">
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

        {/* Mobile Filter Sidebar */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden">
            <div
              className="absolute top-0 bottom-0 left-0 w-[85%] max-w-xs bg-white shadow-xl overflow-y-auto"
              data-filter-sidebar
            >
              <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
                <h2 className="font-bold text-gray-800 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Bộ lọc
                </h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-4 space-y-4">
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

              {/* Apply Filters Button */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                <button
                  className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  Áp dụng ({activeFiltersCount})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right Content - Product List */}
        <div className="lg:col-span-3">
          {/* Header - Desktop */}
          <div className="hidden lg:flex justify-between items-center gap-6 mb-6">
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

          {/* Mobile Sort Dropdown */}
          <div className="lg:hidden mb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-500">
                {filteredProducts.length} sản phẩm
              </span>
              <div className="relative">
                <select
                  className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-1 px-3 pr-8 rounded text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                >
                  {filterTabs.map((tab) => (
                    <option key={tab.value} value={tab.value}>
                      {tab.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-500 text-sm sm:text-lg">
                Không tìm thấy sản phẩm nào
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Loading More Indicator */}
              {hasMore && (
                <div
                  ref={loadMoreRef}
                  className="flex justify-center items-center py-6 sm:py-8"
                >
                  {loadingMore ? (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      <span className="text-xs sm:text-sm">
                        Đang tải thêm sản phẩm...
                      </span>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-xs sm:text-sm">
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
