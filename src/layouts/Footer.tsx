import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-gray-800 border-t">
      {/* Main Footer Content */}
      <div className="mx-auto py-6 px-4 sm:px-6 md:px-[8%] lg:px-[10%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-blue-600 mb-2 sm:mb-4">
              VIET HUNG AUTO PRODUCTION TRADING JOINT STOCK COMPANY
            </h3>
            <div className="space-y-1.5 sm:space-y-2 text-xs md:text-sm text-gray-600">
              <p>
                <strong>Tax code:</strong> 0305094228
              </p>
              <p>
                <strong>Address:</strong> 13 Nghia Thuc, Ward 06, District 5, Ho
                Chi Minh City, Viet Nam.
              </p>
              <p>
                <strong>Phone number:</strong> 0283 760 7607
              </p>
              <p>
                <strong>Opening hour:</strong> 09:00 - 22:00 from Mon - Fri
              </p>
            </div>

            {/* Certification Logo */}
            <div className="mt-4 sm:mt-6">
              <Image
                src="/bo-cong-thuong.png"
                alt="Bộ Công Thương"
                width={100}
                height={50}
                className="object-contain w-[80px] h-[40px] sm:w-[100px] sm:h-[50px] md:w-[120px] md:h-[60px]"
              />
            </div>
          </div>

          {/* Sitemap */}
          <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-0">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Sitemap</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-xs md:text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-xs md:text-sm"
                >
                  Article
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-xs md:text-sm"
                >
                  Cart
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-xs md:text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-0">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Legal</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-xs md:text-sm flex items-center gap-2"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-xs md:text-sm"
                >
                  Cookie policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-xs md:text-sm"
                >
                  Delivery policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-xs md:text-sm"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div className="space-y-3 sm:space-y-4 mt-6 lg:mt-0">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
              Download App
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {/* Google Play Store */}
              <div>
                <a href="#" className="block">
                  <div className="bg-black text-white rounded-lg px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 md:gap-3 hover:bg-gray-800 transition-colors w-full max-w-[150px] sm:max-w-[180px]">
                    <div className="text-white flex-shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                      </svg>
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-[10px] sm:text-xs">GET IT ON</div>
                      <div className="text-xs md:text-sm font-semibold">Google Play</div>
                    </div>
                  </div>
                </a>
              </div>

              {/* Apple App Store */}
              <div>
                <a href="#" className="block">
                  <div className="bg-black text-white rounded-lg px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 md:gap-3 hover:bg-gray-800 transition-colors w-full max-w-[150px] sm:max-w-[180px]">
                    <div className="text-white flex-shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                      </svg>
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-[10px] sm:text-xs">Download on the</div>
                      <div className="text-xs md:text-sm font-semibold">App Store</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Language Selector */}
            <div className="mt-4 sm:mt-6">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">
                  VI
                </div>
                <span className="text-xs md:text-sm text-gray-600">VI</span>
                <svg
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Section - Mobile Friendly */}
      <div className="bg-gray-200 py-3 sm:py-4">
        <div className="mx-auto px-4 sm:px-6 md:px-[8%] lg:px-[10%] text-center">
          <p className="text-[10px] sm:text-xs text-gray-600">
            © {new Date().getFullYear()} Viet Hung Auto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
