import React from "react";
import { MapPin, ArrowRight } from "lucide-react";

const Location: React.FC = () => {
  return (
    <div className="w-full bg-blue-50 py-4">
      <div className="w-full mx-auto px-[10%]">
        <div className="flex items-center justify-between">
          {/* Left side - Icon and text */}
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 p-2 bg-blue-600 rounded-full">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-700 font-medium">
              Xem hệ thống 88 cửa hàng trên toàn quốc
            </span>
          </div>

          {/* Right side - Link */}
          <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 cursor-pointer transition-colors">
            <span className="font-medium">Xem ngay</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
