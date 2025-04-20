import React from "react";
import {
  IconUser,
  IconCalendarWeek,
  IconTag,
  IconLabel,
  IconEye,
  IconPencilMinus,
  IconTrash,
} from "@tabler/icons-react";

interface ContentCardProps {
  title: string;
  author: string;
  date: string;
  category: string;
  status: string;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  author,
  date,
  category,
  status,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white p-4 rounded-[8px]">
      <h3 className="text-[16px] font-semibold text-charcoal mb-4">{title}</h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex gap-1 items-center">
          <IconUser size={16} className="text-charcoal" />
          <p className="text-[14px] font-[400] text-charcoal">{author}</p>
        </div>
        <div className="flex gap-1 items-center">
          <IconCalendarWeek size={16} className="text-charcoal" />
          <p className="text-[14px] font-[400] text-charcoal">{date}</p>
        </div>
        <div className="flex gap-1 items-center">
          <IconTag size={16} className="text-charcoal" />
          <p className="text-[14px] font-[400] text-charcoal">{category}</p>
        </div>
        <div className="flex gap-1 items-center">
          <IconLabel size={16} className="text-charcoal" />
          <p className="text-[14px] font-[400] text-accent-teal">{status}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        {onView && (
          <IconEye
            size={22}
            className="text-accent-teal cursor-pointer"
            onClick={onView}
          />
        )}
        {onEdit && (
          <IconPencilMinus
            size={22}
            className="text-primary cursor-pointer"
            onClick={onEdit}
          />
        )}
        {onDelete && (
          <IconTrash
            size={22}
            className="text-red-700 cursor-pointer"
            onClick={onDelete}
          />
        )}
      </div>
    </div>
  );
};
