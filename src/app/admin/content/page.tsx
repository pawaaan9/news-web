"use client";

import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../admin-layout";
import { Button } from "@/components/ui/button";
import { IconTextWrap } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { LabelText } from "@/modules/shared/label-text";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { categories } from "@/data/categories";
import { contentstatus } from "@/data/status";
import { ContentCard } from "@/modules/content/content-card";
import { useRouter } from "next/navigation";
import { ContentData, deleteContent, getContent } from "@/api/content.api";

const ContentPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [headline, setHeadline] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [filteredContent, setFilteredContent] = useState<ContentData[]>([]);
  const [contentData, setContentData] = useState<ContentData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await getContent();
        if (
          typeof response === "object" &&
          response !== null &&
          "status" in response &&
          response.status === "success" &&
          "data" in response &&
          Array.isArray((response as { data: ContentData[] }).data)
        ) {
          setContentData((response as { data: ContentData[] }).data);
          setFilteredContent((response as { data: ContentData[] }).data); // Set only the `data` field
        } else {
          setContentData([]); // Fallback to an empty array if data is not valid
          setFilteredContent([]); // Fallback to an empty array if data is not valid
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    const filtered = contentData.filter((content) => {
      const matchesHeadline =
        !headline ||
        content.headline1.toLowerCase().includes(headline.toLowerCase());
      const matchesAuthor =
        !author || content.author?.toLowerCase().includes(author.toLowerCase());
      const matchesCategory =
        !selectedCategory || content.category === selectedCategory;
      const matchesStatus =
        !selectedStatus || content.status === selectedStatus;

      return (
        matchesHeadline && matchesAuthor && matchesCategory && matchesStatus
      );
    });

    setFilteredContent(filtered);
  }, [headline, author, selectedCategory, selectedStatus, contentData]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this content?"
    );
    if (!confirmed) return;

    try {
      await deleteContent(id); // Assuming you have a deleteContent function in your API
      setContentData((prev) => prev.filter((content) => content._id !== id));
      setFilteredContent((prev) =>
        prev.filter((content) => content._id !== id)
      );
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content.");
    }
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4 items-end">
        <div>
          <LabelText text="Headline" />
          <Input
            type="text"
            id="headline"
            placeholder="Headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
          />
        </div>
        <div>
          <LabelText text="Author" />
          <Input
            type="text"
            id="author"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
          />
        </div>

        <div>
          <LabelText text="Category" />
          <select
            id="category"
            value={selectedCategory || ""}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 cursor-pointer w-full p-2 rounded-md"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <LabelText text="Status" />
          <select
            id="status"
            value={selectedStatus || ""}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2 cursor-pointer w-full p-2 rounded-md"
          >
            <option value="" disabled>
              Select a status
            </option>
            {contentstatus.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {Array.isArray(filteredContent) && filteredContent.length > 0 ? (
          filteredContent.map((content, index) => (
            <ContentCard
              key={index}
              headlineImage={content.headlineImage}
              title={content.headline1}
              author={content.author || "-"}
              date={
                content.createdTime
                  ? format(new Date(content.createdTime), "yyyy-MM-dd HH:mm") // Format date and time
                  : "N/A"
              }
              category={content.category}
              status={content.status}
              onView={() => console.log("View clicked")}
              onEdit={() =>
                router.push(`/admin/content/edit-content/${content._id}`)
              }
              onDelete={() => handleDelete(content._id)}
            />
          ))
        ) : (
          <p>No content available</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default ContentPage;
