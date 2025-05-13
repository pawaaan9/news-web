import Image from "next/image";
import React from "react";
import {
  IconMapPin,
  IconClockHour4,
  IconCalendarEvent,
  IconLabel,
  IconEye,
  IconPencilMinus,
  IconTrash,
} from "@tabler/icons-react";

interface AdvertisementCardProps {
  id: string;
  title: string;
  photo: string;
  startDate: string;
  endDate: string;
  duration: string;
  country: string;
  status: string;
  onPreview?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const AdvertisementCard: React.FC<AdvertisementCardProps> = ({
  title,
  photo,
  startDate,
  endDate,
  duration,
  country,
  status,
  onPreview,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white p-4 rounded-[8px]">
      <div className="flex gap-4 mb-4">
        <div className="relative w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={photo || "/api/placeholder/300/300"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-[16px] font-semibold text-charcoal">{title}</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex gap-1 items-center">
          <IconMapPin size={16} className="text-charcoal" />
          <p className="text-[14px] font-[400] text-charcoal">{country}</p>
        </div>
        <div className="flex gap-1 items-center">
          <IconClockHour4 size={16} className="text-charcoal" />
          <p className="text-[14px] font-[400] text-charcoal">{duration}</p>
        </div>
        <div className="flex gap-1 items-center">
          <IconCalendarEvent size={16} className="text-charcoal" />
          <p className="text-[14px] font-[400] text-charcoal">
            {startDate} to {endDate}
          </p>
        </div>
        <div className="flex gap-1 items-center">
          <IconLabel size={16} className="text-charcoal" />
          <p className="text-[14px] font-[400] text-accent-teal">{status}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        {onPreview && (
          <IconEye
            size={22}
            className="text-accent-teal cursor-pointer"
            onClick={onPreview}
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
