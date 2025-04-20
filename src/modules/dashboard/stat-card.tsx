import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="w-full h-[150px] bg-primary flex flex-col justify-center items-center p-4 rounded-lg">
      <p className="text-white text-[18px] font-[400] text-center font-dmSans">
        {title}
      </p>
      <p className="text-white text-[24px] font-bold text-center font-dmSans mt-4">
        {value}
      </p>
    </div>
  );
};
