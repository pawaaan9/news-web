import React from "react";

interface PageTitleProps {
  title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <h2 className="text-[20px] lg:text-[24px] font-bold text-charcoal">
      {title}
    </h2>
  );
};
