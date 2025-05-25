import React from "react";
import Image from "next/image";
import { Product } from "@/types/Product";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = "" }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-4 ${className}`}>
      {/* Product Image */}
      <div className="relative mb-3 h-[180px] rounded-lg overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 20vw"
          quality={85}
        />

        {/* "Giá cực sốc" Badge */}
        <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs font-semibold">
          <Star className="w-3 h-3 fill-current" />
          Giá cực sốc
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="space-y-1">
          {/* Current Price */}
          <div className="text-red-600 font-bold text-lg">
            {formatPrice(product.price)}
          </div>

          {/* Original Price and Discount */}
          {product.originalPrice > product.price && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500 line-through text-sm">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-semibold">
                -{product.discount}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 