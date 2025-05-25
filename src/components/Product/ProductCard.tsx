import React from "react";
import Image from "next/image";
import { Product } from "@/types/Product";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from 'react-toastify';

interface ProductCardProps {
  product: Product;
  className?: string;
  onBuyNow?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "",
  onBuyNow,
}) => {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

    const handleBuyNow = () => {
    // Add to cart first
    addToCart(product, 1);
    
    // Show success toast
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
    // Then call custom handler if provided
    if (onBuyNow) {
      onBuyNow(product);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full ${className}`}
    >
      {/* Product Image */}
      <div className="relative mb-3 h-[180px] rounded-lg overflow-hidden group">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 20vw"
          quality={85}
        />

        {/* "Giá cực sốc" Badge */}
        <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs font-semibold">
          <Star className="w-3 h-3 fill-current" />
          Giá cực sốc
        </div>
      </div>

      {/* Product Info - Flex grow to push button to bottom */}
      <div className="flex flex-col flex-grow space-y-3">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Price Section - Fixed height to ensure consistency */}
        <div className="space-y-1 min-h-[60px] flex flex-col justify-start">
          {/* Current Price */}
          <div className="text-red-600 font-bold text-lg">
            {formatPrice(product.price)}
          </div>

          {/* Original Price and Discount */}
          {product.originalPrice > product.price ? (
            <div className="flex items-center gap-2">
              <span className="text-gray-500 line-through text-sm">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-semibold">
                -{product.discount}%
              </span>
            </div>
          ) : (
            <div className="h-6"></div> // Placeholder để giữ chiều cao đồng đều
          )}
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>

        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 active:scale-95 transform mt-auto"
        >
          <ShoppingCart className="w-4 h-4" />
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
