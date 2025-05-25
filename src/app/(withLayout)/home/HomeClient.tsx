"use client";

import { useEffect, useState } from "react";
import Banner from "@/components/Banner/Banner";
import { ProductService } from "@/services/ProductService";
import { Product } from "@/types/Product";
import ProductList from "@/components/Product/ProductList";
import Policy from "@/components/Policy/Policy";
import Location from "@/components/Location/Location";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await ProductService.getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="py-8">
      <Banner
        bannerImage="/banner.png"
        products={featuredProducts}
        loading={loading}
      />
      <ProductList />
      <Policy />
      <Location />
    </div>
  );
}
