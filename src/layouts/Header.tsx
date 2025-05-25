import {
  Search,
  Phone,
  MapPin,
  Bell,
  ShoppingCart,
  User,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full">
      {/* Top Blue Banner */}
      <div className="bg-[#0066CC] text-white text-sm py-2 hidden md:block">
        <div className="mx-auto flex justify-between items-center px-[10%]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">
                Tổng đài tư vấn: gọi ngay để chúng tôi tư vấn miễn phí
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
            {/* Notification */}
            <div className="relative hidden md:block">
              <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                M
              </span>
            </div>

            {/* Cart */}
            <div className="flex items-center gap-1 md:gap-2">
              <div className="relative">
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                  0
                </span>
              </div>
              <span className="text-xs md:text-sm text-gray-600 hidden sm:inline">
                Giỏ hàng
              </span>
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
      <div className="bg-[#0066CC] text-white py-3">
        <div className="mx-auto flex items-center justify-between px-[5%] md:px-[10%]">
          <div className="flex items-center gap-3 md:gap-6">
            {/* Menu Button */}
            <Button
              variant="secondary"
              className="bg-[#004499] hover:bg-[#003366] text-white flex items-center gap-1 md:gap-2 flex-shrink-0 text-xs md:text-sm px-2 md:px-4"
            >
              <Menu className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Danh Mục Sản Phẩm</span>
              <span className="sm:hidden">Menu</span>
            </Button>

            {/* Navigation Links */}
            <nav className="flex items-center gap-2 md:gap-4">
              <a
                href="#"
                className="hover:text-blue-200 transition-colors whitespace-nowrap text-xs md:text-sm"
              >
                Về Chúng Tôi
              </a>
              <a
                href="#"
                className="hover:text-blue-200 transition-colors whitespace-nowrap text-xs md:text-sm hidden sm:block"
              >
                Bài Viết
              </a>
              <a
                href="#"
                className="hover:text-blue-200 transition-colors whitespace-nowrap text-xs md:text-sm hidden md:block"
              >
                Catalogue
              </a>
              <a
                href="#"
                className="hover:text-blue-200 transition-colors whitespace-nowrap text-xs md:text-sm"
              >
                Liên Hệ
              </a>
            </nav>
          </div>

          {/* Right Side Services */}
          <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm flex-shrink-0">
            <div className="flex items-center gap-1 hidden lg:flex">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full flex items-center justify-center">
                <Phone className="w-2 h-2 md:w-3 md:h-3 text-[#0066CC]" />
              </div>
              <span className="whitespace-nowrap">Hỗ trợ 24/7</span>
            </div>

            <div className="flex items-center gap-1 hidden xl:flex">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full flex items-center justify-center">
                <ShoppingCart className="w-2 h-2 md:w-3 md:h-3 text-[#0066CC]" />
              </div>
              <span className="whitespace-nowrap">Miễn Phí Vận Chuyển</span>
            </div>

            <div className="flex items-center gap-1 hidden lg:flex">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full flex items-center justify-center">
                <Bell className="w-2 h-2 md:w-3 md:h-3 text-[#0066CC]" />
              </div>
              <span className="whitespace-nowrap">Giao Hàng Nhanh 2h</span>
            </div>

            <div className="flex items-center gap-1 hidden xl:flex">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full flex items-center justify-center">
                <MapPin className="w-2 h-2 md:w-3 md:h-3 text-[#0066CC]" />
              </div>
              <span className="whitespace-nowrap">30 Ngày Đổi Trả</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
