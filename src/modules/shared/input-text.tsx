import React from "react";

interface InputTextProps {
  text: string;
}

export const InputText: React.FC<InputTextProps> = ({ text }) => {
  return (
    <label className="font-[600] text-[16px] text-charcoal mb-2">{text}</label>
  );
};
