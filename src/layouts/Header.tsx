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

export default function Header() {
  return (
    <header className="w-full">
      {/* Top Blue Banner */}
      <div className="bg-[#0066CC] text-white text-sm py-2">
        <div className="mx-auto flex justify-between items-center px-[15%]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              Tổng đài tư vấn: gọi ngay để chúng tôi tư vấn miễn phí
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              Hotline: 0123 456 7891
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Hệ thống cửa hàng
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-sm py-4">
        <div className="mx-auto flex items-center justify-between gap-4 px-[15%]">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <div className="text-xl font-bold">
              <span className="text-[#0066CC]">SUN</span>
              <span className="text-[#FF6B35]">EIL</span>
            </div>
            <div className="text-xs text-gray-500 ml-1">
              <div>GASOLINE & FILTER</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-sm mx-4">
            <div className="relative flex">
              <Input
                type="text"
                placeholder="Tìm sản phẩm..."
                className="rounded-l-full border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-gray-300"
              />
              <Button
                size="sm"
                className="rounded-r-full bg-[#0066CC] hover:bg-[#0052A3] px-4"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Notification */}
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                M
              </span>
            </div>

            {/* Cart */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </div>
              <span className="text-sm text-gray-600">Giỏ hàng</span>
            </div>

            {/* User Account */}
            <div className="flex items-center gap-2">
              <User className="w-6 h-6 text-gray-600" />
              <span className="text-sm text-gray-600">Tài khoản</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-[#0066CC] text-white py-3">
        <div className="mx-auto flex items-center justify-between px-[15%]">
          <div className="flex items-center gap-6">
            {/* Menu Button */}
            <Button
              variant="secondary"
              className="bg-[#004499] hover:bg-[#003366] text-white flex items-center gap-2 flex-shrink-0"
            >
              <Menu className="w-4 h-4" />
              Danh Mục Sản Phẩm
            </Button>

            {/* Navigation Links */}
            <nav className="flex items-center gap-4">
              <a
                href="#"
                className="hover:text-blue-200 transition-colors whitespace-nowrap"
              >
                Về Chúng Tôi
              </a>
              <a
                href="#"
                className="hover:text-blue-200 transition-colors whitespace-nowrap"
              >
                Bài Viết
              </a>
              <a
                href="#"
                className="hover:text-blue-200 transition-colors whitespace-nowrap"
              >
                Catalogue
              </a>
              <a
                href="#"
                className="hover:text-blue-200 transition-colors whitespace-nowrap"
              >
                Liên Hệ
              </a>
            </nav>
          </div>

          {/* Right Side Services */}
          <div className="flex items-center gap-4 text-sm flex-shrink-0">
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <Phone className="w-3 h-3 text-[#0066CC]" />
              </div>
              <span className="whitespace-nowrap">Hỗ trợ 24/7</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <ShoppingCart className="w-3 h-3 text-[#0066CC]" />
              </div>
              <span className="whitespace-nowrap">Miễn Phí Vận Chuyển</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <Bell className="w-3 h-3 text-[#0066CC]" />
              </div>
              <span className="whitespace-nowrap">Giao Hàng Nhanh 2h</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <MapPin className="w-3 h-3 text-[#0066CC]" />
              </div>
              <span className="whitespace-nowrap">30 Ngày Đổi Trả</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
