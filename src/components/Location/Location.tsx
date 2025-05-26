import React from "react";
import { MapPin, ArrowRight } from "lucide-react";

const Location: React.FC = () => {
  return (
    <div className="w-full bg-blue-50 py-3 sm:py-4">
      <div className="w-full mx-auto px-4 sm:px-6 md:px-[8%] lg:px-[10%]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          {/* Left side - Icon and text */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-shrink-0 p-1.5 sm:p-2 bg-blue-600 rounded-full">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-gray-700 font-medium text-xs sm:text-sm md:text-base text-center sm:text-left">
              Xem hệ thống 88 cửa hàng trên toàn quốc
            </span>
          </div>

          {/* Right side - Link */}
          <div className="flex items-center gap-1 sm:gap-2 text-blue-600 hover:text-blue-700 cursor-pointer transition-colors mt-2 sm:mt-0">
            <span className="font-medium text-xs sm:text-sm">Xem ngay</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
