"use client";

import {
  Search,
  Phone,
  MapPin,
  Bell,
  ShoppingCart,
  User,
  Menu,
  TicketPercent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import CartDropdown from "@/components/Cart/CartDropdown";
import CategoryDropdown from "@/components/CategoryDropdown/CategoryDropdown";
import React, { useState, useEffect } from "react";

export default function Header() {
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Close cart and category dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest("[data-cart-container]")) {
      setIsCartOpen(false);
    }
    if (!target.closest("[data-category-container]")) {
      setIsCategoryDropdownOpen(false);
    }
  };

  // Add event listener for clicking outside
  useEffect(() => {
    if (isCartOpen || isCategoryDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isCartOpen, isCategoryDropdownOpen]);

  // Handle hover to open cart
  const handleCartHover = () => {
    setIsCartOpen(true);
  };

  return (
    <header className="w-full">
      {/* Top Blue Banner */}
      <div className="bg-gradient-to-r from-[#0066CC] via-[#4da6ff] to-[#0066CC] text-white text-sm py-2 hidden md:block">
        <div className="mx-auto flex justify-between items-center px-[10%]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <TicketPercent className="w-4 h-4" />
              <span className="hidden lg:inline">
                Nhập mã{" "}
                <span className="font-bold text-yellow-500">NEWBIE</span> giảm
                ngay 10% cho lần đầu mua hàng.
              </span>
              <span className="lg:hidden">Tư vấn miễn phí</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              Hotline: 0123 456 7891
            </span>
            <span className="flex items-center gap-1 hidden lg:flex">
              <MapPin className="w-4 h-4" />
              Hệ thống cửa hàng
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-sm py-4">
        <div className="mx-auto flex items-center justify-between gap-2 md:gap-4 px-[5%] md:px-[10%]">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Image
              src="/logo_sunfil1.png"
              alt="SUNEIL Logo"
              width={100}
              height={50}
              className="object-contain md:w-[120px] md:h-[60px]"
            />
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs md:max-w-sm mx-2 md:mx-4">
            <div className="relative flex items-center">
              <Input
                type="text"
                placeholder="Tìm sản phẩm..."
                className="rounded-l-full border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-gray-300 h-8 md:h-10 text-sm"
              />
              <Button
                size="sm"
                className="rounded-r-full bg-[#0066CC] hover:bg-[#0052A3] px-2 md:px-4 h-8 md:h-10"
              >
                <Search className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {/* Cart */}
            <div className="relative" data-cart-container>
              <div
                className="flex items-center gap-1 md:gap-2 cursor-pointer"
                onMouseEnter={handleCartHover}
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </div>
                <span className="text-xs md:text-sm text-gray-600 hidden sm:inline">
                  Giỏ hàng
                </span>
              </div>

              {/* Cart Dropdown */}
              {isCartOpen && <CartDropdown />}
            </div>

            {/* User Account */}
            <div className="flex items-center gap-1 md:gap-2">
              <User className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              <span className="text-xs md:text-sm text-gray-600 hidden sm:inline">
                Tài khoản
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div
        className="bg-white border-b border-gray-200 py-3 relative"
        data-category-container
      >
        <div className="mx-auto flex items-center justify-between px-[5%] md:px-[10%]">
          <div className="flex items-center gap-3 md:gap-6">
            {/* Menu Button */}
            <Button
              variant="secondary"
              className="bg-[#0066CC] hover:bg-[#004499] text-white flex items-center gap-1 md:gap-2 flex-shrink-0 text-xs md:text-sm px-2 md:px-4"
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
            >
              <Menu className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Danh Mục Sản Phẩm</span>
              <span className="sm:hidden">Menu</span>
            </Button>

            {/* Navigation Links */}
            <nav className="flex items-center gap-2 md:gap-4">
              <a
                href="#"
                className="hover:text-blue-600 transition-colors whitespace-nowrap text-xs md:text-sm text-gray-800"
              >
                Về Chúng Tôi
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors whitespace-nowrap text-xs md:text-sm text-gray-800 hidden sm:block"
              >
                Bài Viết
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors whitespace-nowrap text-xs md:text-sm text-gray-800 hidden md:block"
              >
                Catalog
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors whitespace-nowrap text-xs md:text-sm text-gray-800"
              >
                Liên Hệ
              </a>
            </nav>
          </div>

          {/* Right Side Services */}
          <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm flex-shrink-0">
            <div className="flex items-center gap-1 hidden lg:flex">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#0066CC] rounded-full flex items-center justify-center">
                <Phone className="w-2 h-2 md:w-3 md:h-3 text-white" />
              </div>
              <span className="whitespace-nowrap text-gray-800">
                Hỗ trợ 24/7
              </span>
            </div>

            <div className="flex items-center gap-1 hidden xl:flex">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#0066CC] rounded-full flex items-center justify-center">
                <ShoppingCart className="w-2 h-2 md:w-3 md:h-3 text-white" />
              </div>
              <span className="whitespace-nowrap text-gray-800">
                Miễn Phí Vận Chuyển
              </span>
            </div>

            <div className="flex items-center gap-1 hidden lg:flex">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#0066CC] rounded-full flex items-center justify-center">
                <Bell className="w-2 h-2 md:w-3 md:h-3 text-white" />
              </div>
              <span className="whitespace-nowrap text-gray-800">
                Giao Hàng Nhanh 2h
              </span>
            </div>

            <div className="flex items-center gap-1 hidden xl:flex">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#0066CC] rounded-full flex items-center justify-center">
                <MapPin className="w-2 h-2 md:w-3 md:h-3 text-white" />
              </div>
              <span className="whitespace-nowrap text-gray-800">
                30 Ngày Đổi Trả
              </span>
            </div>
          </div>
        </div>

        {/* Category Dropdown */}
        <CategoryDropdown
          isOpen={isCategoryDropdownOpen}
          onClose={() => setIsCategoryDropdownOpen(false)}
        />
      </div>
    </header>
  );
}
