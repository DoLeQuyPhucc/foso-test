import React, { useState } from "react";
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



  const nextSlide = () => {
    if (currentIndex < carouselProducts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Show 5 items at a time
  const getVisibleProducts = () => {
    return carouselProducts.slice(currentIndex, currentIndex + 5);
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

  return (
    <div className="w-full mx-auto px-[10%]">
      {/* Banner Image Section */}
      <div className="w-full aspect-[3/1] sm:aspect-[3/1] md:aspect-[3/1] lg:aspect-[3/1] relative overflow-hidden rounded-lg">
        <Image
          src={bannerImage}
          alt="Banner"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 80vw"
          quality={90}
        />
      </div>

      {/* Product Carousel Section - No gap, directly below banner */}
      <div className="bg-blue-600 rounded-b-lg p-6 -mt-2">
        <div className="relative">
          {/* Navigation Buttons */}
          {!loading && carouselProducts.length > 5 && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              <button
                onClick={nextSlide}
                disabled={currentIndex >= carouselProducts.length - 5}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-12">
            {loading
              ? // Show skeleton loading
                Array.from({ length: 5 }).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))
              : // Show actual products
                getVisibleProducts().map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          {/* Dots Indicator */}
          {!loading && carouselProducts.length > 5 && (
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({
                length: Math.ceil(carouselProducts.length / 5),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * 5)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    Math.floor(currentIndex / 5) === index
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
