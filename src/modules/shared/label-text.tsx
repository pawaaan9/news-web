import React from "react";

interface LabelTextProps {
  text: string;
}

export const LabelText: React.FC<LabelTextProps> = ({ text }) => {
  return <p className="text-[14px] text-charcoal/60">{text}</p>;
};
