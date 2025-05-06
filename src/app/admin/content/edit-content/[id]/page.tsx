"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "@/app/admin/admin-layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LabelText } from "@/modules/shared/label-text";
import { categories } from "@/data/categories";
import { contentstatus } from "@/data/status";
import {
  ContentData,
  ContentBlock,
  getContentById,
  updateContent,
} from "@/api/content.api";

const UpdateContentPage = () => {
  const [content, setContent] = useState<ContentData | null>(null);
  const [headline1, setHeadline1] = useState<string>("");
  const [headline2, setHeadline2] = useState<string>("");
  const [headline3, setHeadline3] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const router = useRouter();
  const { id } = useParams(); // Get the content ID from the URL

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (!id) return;
        const response = await getContentById(id);
        if (response.status === "success") {
          const data = response.data;
          setContent(data);
          setHeadline1(data.headline1);
          setHeadline2(data.headline2);
          setHeadline3(data.headline3 || "");
          setUrl(data.url);
          setSelectedCategory(data.category);
          setSelectedStatus(data.status);
          setContentBlocks(data.contentBlocks || []);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, [id]);

  const handleContentChange = (id: number, value: string | File | null) => {
    setContentBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id
          ? block.type === "paragraph" || block.type === "video"
            ? { ...block, content: value as string }
            : { ...block, file: value as File | undefined }
          : block
      )
    );
  };

  const addParagraph = () => {
    setContentBlocks([
      ...contentBlocks,
      { type: "paragraph", id: contentBlocks.length + 1, content: "" },
    ]);
  };

  const addImage = () => {
    setContentBlocks([
      ...contentBlocks,
      { type: "image", id: contentBlocks.length + 1, file: undefined },
    ]);
  };

  const addVideoLink = () => {
    setContentBlocks([
      ...contentBlocks,
      { type: "video", id: contentBlocks.length + 1, content: "" },
    ]);
  };

  const handleUpdate = async () => {
    if (!selectedCategory) {
      alert("Category is required.");
      return;
    }

    try {
      const updatedContent = {
        headline1,
        headline2,
        headline3,
        url,
        category: selectedCategory,
        status: selectedStatus || "Draft",
        contentBlocks,
      };

      await updateContent(id, updatedContent);
      alert("Content updated successfully!");
      router.push("/admin/content"); // Redirect to the content list page
    } catch (error) {
      console.error("Error updating content:", error);
      alert("Failed to update content.");
    }
  };

  if (!content) {
    return <p>Loading...</p>;
  }

  return (
    <AdminLayout pageTitle="Update Content">
      <div className="bg-white p-4 rounded-lg">
        <PageTitle title="Update Content" />
        <div className="flex flex-col gap-4 mt-4">
          <div>
            <LabelText text="Headline 1" />
            <Input
              type="text"
              value={headline1}
              onChange={(e) => setHeadline1(e.target.value)}
              className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
          </div>
          <div>
            <LabelText text="Headline 2" />
            <Input
              type="text"
              value={headline2}
              onChange={(e) => setHeadline2(e.target.value)}
              className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
          </div>
          <div>
            <LabelText text="Headline 3 (Optional)" />
            <Input
              type="text"
              value={headline3}
              onChange={(e) => setHeadline3(e.target.value)}
              className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
          </div>
          <div>
            <LabelText text="URL" />
            <Input
              type="text"
              value={url}
              readOnly
              className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
          </div>

          <div>
            <LabelText text="Category" />
            <select
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
          <div>
            <LabelText text="Content Blocks" />
            {contentBlocks.map((block, index) => (
              <div key={block.id} className="mb-4">
                {block.type === "paragraph" ? (
                  <div>
                    <LabelText text={`Paragraph ${index + 1}`} />
                    <Textarea
                      rows={4}
                      value={block.content || ""}
                      onChange={(e) =>
                        handleContentChange(block.id, e.target.value)
                      }
                      className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
                    />
                  </div>
                ) : block.type === "image" ? (
                  <div>
                    <LabelText text="Image" />
                    <Input
                      type="file"
                      onChange={(e) =>
                        handleContentChange(
                          block.id,
                          e.target.files?.[0] || null
                        )
                      }
                      className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
                    />
                  </div>
                ) : block.type === "video" ? (
                  <div>
                    <LabelText text="Video Link" />
                    <Input
                      type="text"
                      value={block.content || ""}
                      onChange={(e) =>
                        handleContentChange(block.id, e.target.value)
                      }
                      placeholder="Enter YouTube video link"
                      className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
                    />
                  </div>
                ) : null}
              </div>
            ))}
            <div className="flex gap-2 mt-4">
              <Button className="bg-primary text-white" onClick={addParagraph}>
                Add Paragraph
              </Button>
              <Button className="bg-primary text-white" onClick={addImage}>
                Add Image
              </Button>
              <Button className="bg-primary text-white" onClick={addVideoLink}>
                Add Video Link
              </Button>
            </div>
          </div>
          <Button
            className="bg-primary text-white hover:bg-primary/80 mt-4"
            onClick={handleUpdate}
          >
            Update Content
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateContentPage;
