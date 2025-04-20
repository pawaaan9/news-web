"use client";

import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../admin-layout";
import { Button } from "@/components/ui/button";
import { IconTextWrap } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { LabelText } from "@/modules/shared/label-text";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { format } from "date-fns";
import { categories } from "@/data/categories";
import { contentstatus } from "@/data/status";
import { ContentCard } from "@/modules/content/content-card";
import { contentData } from "@/data/content";
import { useRouter } from "next/navigation";

const ContentPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const router = useRouter();

  const handleView = () => {
    console.log("View clicked");
  };

  const handleEdit = () => {
    console.log("Edit clicked");
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  return (
    <AdminLayout pageTitle="content">
      <div className="flex justify-between ">
        <PageTitle title="Manage content" />
        <Button
          className="bg-primary text-white hover:bg-primary/80 "
          onClick={() => {
            router.push("/admin/content/create-content");
          }}
        >
          <IconTextWrap size={20} />
          Add content
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4 items-end">
        <div>
          <LabelText text="Headline" />
          <Input
            type="text"
            id="headline"
            placeholder="Headline"
            className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
          />
        </div>
        <div>
          <LabelText text="Author" />
          <Input
            type="text"
            id="author"
            placeholder="Author"
            className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
          />
        </div>
        <div>
          <LabelText text="Created Date" />
          <Popover>
            <PopoverTrigger asChild>
              <Input
                type="text"
                id="createdDate"
                placeholder="Select a date"
                value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
                readOnly
                className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate || undefined}
                onSelect={(date) => setSelectedDate(date || null)}
                className=" rounded-md bg-white "
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <LabelText text="Category" />
          <Popover>
            <PopoverTrigger asChild>
              <Input
                type="text"
                id="category"
                placeholder="Select a category"
                value={selectedCategory || ""}
                readOnly
                className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 rounded-md bg-white shadow-md">
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className="p-2 hover:bg-primary hover:text-white cursor-pointer rounded"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <LabelText text="Status" />
          <Popover>
            <PopoverTrigger asChild>
              <Input
                type="text"
                id="status"
                placeholder="Select a status"
                value={selectedStatus || ""}
                readOnly
                className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 rounded-md bg-white shadow-md">
              <ul className="space-y-2">
                {contentstatus.map((status, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedStatus(status)}
                    className="p-2 hover:bg-primary hover:text-white cursor-pointer rounded"
                  >
                    {status}
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </div>
        <Button
          className="bg-primary text-white hover:bg-primary/80 "
          size="lg"
        >
          Search
        </Button>
      </div>

      {/* Content  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        {contentData.map((content, index) => (
          <ContentCard
            key={index}
            title={content.title}
            author={content.author}
            date={content.date}
            category={content.category}
            status={content.status}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </AdminLayout>
  );
};

export default ContentPage;
