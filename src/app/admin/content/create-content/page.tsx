"use client";

import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../../admin-layout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { InputText } from "@/modules/shared/input-text";
import { categories } from "@/data/categories";
import { useEffect, useState } from "react";
import KeywordsInput from "@/modules/content/keyword-input";
import { Button } from "@/components/ui/button";
import {
  IconBrowserShare,
  IconCamera,
  IconEye,
  IconNote,
  IconTextWrap,
  IconVideo,
} from "@tabler/icons-react";
import { LabelText } from "@/modules/shared/label-text";
import { ContentBlock, submitContent } from "@/api/content.api";
import { useRouter } from "next/navigation";
import { getProfile } from "@/api/auth.api";
import withAuth from "@/hoc/with-auth";

const CreateContent = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [headline1, setHeadline1] = useState("");
  const [headline2, setHeadline2] = useState("");
  const [headline3, setHeadline3] = useState("");
  const [url, setUrl] = useState("");
  const [headlineImage, setHeadlineImage] = useState<File | null>(null);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    { type: "paragraph", id: 1 },
  ]);
  const [author, setAuthor] = useState<string>("");
  const router = useRouter();

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordsChange = (keywords: string[]) => {
    setSelectedKeywords(keywords);
  };

  const addParagraph = () => {
    if (!contentBlocks[contentBlocks.length - 1].content) {
      alert("Please fill the current paragraph before adding a new one.");
      return;
    }
    setContentBlocks([
      ...contentBlocks,
      { type: "paragraph", id: contentBlocks.length + 1, content: "" },
    ]);
  };

  const addImage = () => {
    if (!contentBlocks[contentBlocks.length - 1].content) {
      alert("Please fill the current paragraph before adding an image.");
      return;
    }
    setContentBlocks([
      ...contentBlocks,
      { type: "image", id: contentBlocks.length + 1, file: undefined }, // Use `undefined` instead of `null`
    ]);
  };

  const addVideoLink = () => {
    const videoId = contentBlocks.length + 1;
    setContentBlocks([
      ...contentBlocks,
      { type: "video", id: videoId, content: "" }, // Add a video block
    ]);
  };

  const handleContentChange = (id: number, value: string | File | null) => {
    setContentBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id
          ? block.type === "paragraph" || block.type === "video"
            ? { ...block, content: value as string }
            : { ...block, file: value as File | undefined } // Ensure `file` is `undefined` if `null`
          : block
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProfile(); // ✅ now correctly typed
        setAuthor(result.data.user.username);
        console.log("Author fetched:", result.data.user.username);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (status: "Draft" | "Published") => {
    if (!selectedCategory) {
      alert("Category is required.");
      return;
    }
    console.log("Author before submission:", author);

    try {
      await submitContent({
        headline1,
        headline2,
        headline3,
        url,
        category: selectedCategory,
        keywords: selectedKeywords,
        status,
        headlineImage,
        contentBlocks,
        author,
      });

      router.push("/admin/content"); // Redirect to the content page after submission
    } catch (error) {
      console.error("Error submitting content:", error);
    }
  };

  return (
    <AdminLayout pageTitle="CONTENT">
      <div className="bg-white p-4 rounded-lg ">
        <PageTitle title="Create content" />
        <div className="flex flex-col gap-4 mt-4">
          <div>
            <InputText text="Headline 1 (max 40 characters)" />
            <Textarea
              rows={2}
              value={headline1}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 40) {
                  setHeadline1(value);
                  setUrl(
                    value
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, "")
                  );
                }
              }}
              placeholder="Enter headline"
              className="lg:hidden border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
            <Input
              type="text"
              value={headline1}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 40) {
                  setHeadline1(value);
                  setUrl(
                    value
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, "")
                  );
                }
              }}
              placeholder="Enter headline"
              className="hidden lg:block border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
            <p className="text-sm text-charcoal/60 mt-1">
              {headline1.length}/40 characters
            </p>
          </div>
          <div>
            <InputText text="Headline 2 (max 60 characters)" />
            <Textarea
              rows={2}
              value={headline2}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 60) {
                  setHeadline2(value);
                }
              }}
              placeholder="Enter headline"
              className="lg:hidden border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
            <Input
              type="text"
              value={headline2}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 60) {
                  setHeadline2(value);
                }
              }}
              placeholder="Enter headline"
              className="hidden lg:block border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
            <p className="text-sm text-charcoal/60 mt-1">
              {headline2.length}/60 characters
            </p>
          </div>
          <div>
            <InputText text="Headline 3 (Optional)" />
            <Textarea
              rows={2}
              value={headline3}
              onChange={(e) => setHeadline3(e.target.value)}
              placeholder="Enter headline"
              className="lg:hidden border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
            <Input
              type="text"
              value={headline3}
              onChange={(e) => setHeadline3(e.target.value)}
              placeholder="Enter headline"
              className="hidden lg:block border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
          </div>
          <div>
            <InputText text="URL (Auto generated from title)" />
            <Textarea
              rows={2}
              value={url}
              readOnly
              className="lg:hidden border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
            <Input
              type="text"
              id="url"
              value={url}
              readOnly
              className="hidden lg:block border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
          </div>

          <div>
            <InputText text="Headline image" />
            <Input
              onChange={(e) => setHeadlineImage(e.target.files?.[0] || null)}
              type="file"
              accept="image/*"
              className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
          </div>

          <div>
            <InputText text="Category" />
            <div className="mt-2 grid grid-cols-2">
              {categories.map((category, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 mb-2 cursor-pointer text-[14px]"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={() => handleCategoryChange(category)}
                    className="form-radio text-primary focus:ring-primary/80"
                  />
                  <span className="text-charcoal">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <KeywordsInput onKeywordsChange={handleKeywordsChange} />
          </div>

          <div>
            <label className="font-[600] text-[16px] text-charcoal ">
              Content
            </label>
            <div className="mt-4">
              {contentBlocks.map((block, index) => (
                <div key={block.id} className="mb-4">
                  {block.type === "paragraph" ? (
                    <div>
                      <InputText text={`Paragraph ${index + 1}`} />
                      <Textarea
                        rows={4}
                        placeholder={`Enter content for Paragraph ${index + 1}`}
                        value={block.content || ""}
                        onChange={(e) =>
                          handleContentChange(block.id, e.target.value)
                        }
                        className="border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
                      />
                    </div>
                  ) : block.type === "image" ? (
                    <div>
                      <InputText text="Image" />
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
                      <InputText text="YouTube Video Link" />
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
                <Button
                  className="bg-primary text-white"
                  onClick={addParagraph}
                >
                  <IconTextWrap size={20} /> Add Paragraph
                </Button>
                <Button
                  variant="outline"
                  className="bg-white text-primary border border-primary"
                  onClick={addImage}
                >
                  <IconCamera size={20} /> Add Image
                </Button>
                <Button
                  variant="outline"
                  className="bg-white text-primary border border-primary"
                  onClick={addVideoLink}
                >
                  <IconVideo size={20} /> Add Video Link
                </Button>
              </div>
            </div>
          </div>

          <div>
            <LabelText text="Once you've finished writing your news article:" />
            <LabelText text="- Click Preview to see how it will appear to readers." />
            <LabelText text="- Click Save as Draft if you're not ready to publish yet, your progress will be saved." />
            <LabelText text="- Click Publish to make this article live immediately." />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <Button className="bg-accent-teal text-white hover:bg-accent-teal/80 cursor-pointer">
              <IconEye size={20} />
              Preview
            </Button>
            <Button
              className="bg-white text-primary border-primary border hover:bg-primary/10 cursor-pointer"
              variant="outline"
              onClick={() => handleSubmit("Draft")}
            >
              <IconNote size={20} />
              Save as Draft
            </Button>
            <Button
              className="bg-primary text-white hover:bg-primary/80 cursor-pointer"
              onClick={() => handleSubmit("Published")}
            >
              <IconBrowserShare size={20} /> Publish
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(CreateContent);
