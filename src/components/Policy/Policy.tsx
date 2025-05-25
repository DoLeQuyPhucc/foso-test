import React from "react";
import { Truck, Headphones, Clock, RotateCcw } from "lucide-react";

interface PolicyItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Policy: React.FC = () => {
  const policyItems: PolicyItem[] = [
    {
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      title: "Miễn phí vận chuyển",
      description: "Với hóa đơn từ 1 triệu",
    },
    {
      icon: <Headphones className="w-8 h-8 text-blue-600" />,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ tư vấn viên sẵn sàng lắng nghe và phục vụ tận tâm",
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Giao hàng nhanh 2h",
      description: "Trong vòng bán kính 10km nội thành TP.HCM",
    },
    {
      icon: <RotateCcw className="w-8 h-8 text-blue-600" />,
      title: "30 ngày đổi trả",
      description:
        "Hoàn tiền 100% nếu sản phẩm lỗi từ NSX hoặc đơn vị vận chuyển",
    },
  ];

  return (
    <div className="w-full mx-auto px-[8%] py-8">
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {policyItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Icon */}
              <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg">
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Policy;
