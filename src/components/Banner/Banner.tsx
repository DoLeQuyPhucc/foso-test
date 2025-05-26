import React, { useState, useEffect } from "react";
import { Product } from "@/types/Product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import ProductCard from "@/components/Product/ProductCard";

interface BannerProps {
  bannerImage?: string;
  products?: Product[];
  loading?: boolean;
}

const Banner: React.FC<BannerProps> = ({
  bannerImage = "/banner.png",
  products = [],
  loading = false,
}) => {
  // Take all products for carousel
  const carouselProducts = products;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  
  // Get items to show based on screen width
  const getItemsToShow = (width: number) => {
    if (width < 640) return 1;
    if (width < 1024) return 3;
    return 5;
  };
  
  // Set initial window width and add resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Set initial width
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
    
    // Add resize listener
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const nextSlide = () => {
    const itemsToShow = getItemsToShow(windowWidth);
    if (currentIndex < carouselProducts.length - itemsToShow) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Responsive product display
  const getVisibleProducts = () => {
    const itemsToShow = getItemsToShow(windowWidth);
    return carouselProducts.slice(currentIndex, currentIndex + itemsToShow);
  };

  // Skeleton component for loading state
  const ProductSkeleton = () => (
    <div className="bg-white rounded-lg shadow-lg p-4 animate-pulse">
      <div className="relative mb-3">
        <div className="w-full h-[180px] bg-gray-300 rounded-lg"></div>
        <div className="absolute top-2 left-2 bg-gray-300 rounded-md w-20 h-6"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="space-y-1">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-12"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Calculate items to show based on current window width
  const itemsToShow = getItemsToShow(windowWidth);

  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-[8%] lg:px-[10%]">
      {/* Banner Image Section - More responsive for mobile */}
      <div className="w-full aspect-[16/9] sm:aspect-[5/2] md:aspect-[3/1] relative overflow-hidden rounded-lg">
        <Image
          src={bannerImage}
          alt="Banner"
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 80vw"
          quality={90}
        />
      </div>

      {/* Product Carousel Section - No gap, directly below banner */}
      <div className="bg-blue-600 rounded-b-lg p-3 sm:p-4 md:p-6 -mt-2">
        <div className="relative">
          {/* Navigation Buttons */}
          {!loading && carouselProducts.length > itemsToShow && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 sm:p-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>

              <button
                onClick={nextSlide}
                disabled={currentIndex >= carouselProducts.length - itemsToShow}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 sm:p-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 px-3 sm:px-8 md:px-12">
            {loading
              ? // Show skeleton loading - responsive number of skeletons
                Array.from({
                  length: itemsToShow,
                }).map((_, index) => <ProductSkeleton key={index} />)
              : // Show actual products
                getVisibleProducts().map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          {/* Dots Indicator */}
          {!loading && carouselProducts.length > itemsToShow && (
            <div className="flex justify-center mt-2 sm:mt-3 md:mt-4 space-x-1 sm:space-x-2">
              {Array.from({
                length: Math.ceil(carouselProducts.length / itemsToShow),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsToShow)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
                    Math.floor(currentIndex / itemsToShow) === index
                      ? "bg-white"
                      : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
