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
  IconEye,
  IconNote,
  IconLoader2,
} from "@tabler/icons-react";
import { LabelText } from "@/modules/shared/label-text";
import { submitContent } from "@/api/content.api";
import { useRouter } from "next/navigation";
import { getProfile } from "@/api/auth.api";
import withAuth from "@/hoc/with-auth";
import { format } from "date-fns";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

const CreateContent = () => {
  const [selectedCategories, setSelectedCategories] = useState<
    { name: string; subCategory?: string }[]
  >([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [headline1, setHeadline1] = useState("");
  const [headline2, setHeadline2] = useState("");
  const [headline3, setHeadline3] = useState("");
  const [url, setUrl] = useState("");
  const [headlineImage, setHeadlineImage] = useState<File | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);
  const [seoTitle, setSeoTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [publishOption, setPublishOption] = useState<"now" | "schedule">("now");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const router = useRouter();

  // Handler for category checkbox
  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, { name: categoryName }]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat.name !== categoryName)
      );
    }
  };

  // Handler for subcategory select
  const handleSubCategoryChange = (
    categoryName: string,
    subCategory: string
  ) => {
    setSelectedCategories(
      selectedCategories.map((cat) =>
        cat.name === categoryName ? { ...cat, subCategory } : cat
      )
    );
  };

  const handleKeywordsChange = (keywords: string[]) => {
    setSelectedKeywords(keywords);
  };

  const handleRichTextImageUpload = async (file: File): Promise<string> => {
    setIsImageUploading(true);
    const formData = new FormData();
    formData.append("images", file);

    try {
      const response = await axios.post<{ urls: string[] }>(
        `${API_URL}/content/upload/rich-text`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Check if we have a valid URL in the response
      if (
        response.data &&
        Array.isArray(response.data.urls) &&
        response.data.urls.length > 0
      ) {
        console.log(
          "Rich text image upload successful:",
          response.data.urls[0]
        );
        return response.data.urls[0];
      } else {
        console.error("Invalid response format:", response.data);
        throw new Error("Invalid response format from server");
      }
    } catch (error: unknown) {
      console.error("Error uploading rich text image:", error);
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { status?: number; data?: unknown };
          message?: string;
        };
        console.error("Upload error details:", {
          status: axiosError.response?.status,
          data: axiosError.response?.data,
          message: axiosError.message,
        });
      }
      throw error;
    } finally {
      setIsImageUploading(false);
    }
  };

  const generateUrl = (title: string) => {
    const today = format(new Date(), "yyyy-MM-dd");
    return `${title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")}-${today}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProfile();
        setAuthor(result.data.user.username);
        console.log("Author fetched:", result.data.user.username);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (status: "Draft" | "Published") => {
    if (!selectedCategories) {
      alert("Category is required.");
      return;
    }

    if (!headlineImage) {
      alert("Headline image is required.");
      return;
    }

    if (publishOption === "schedule" && (!scheduledDate || !scheduledTime)) {
      alert("Please select both date and time for scheduling.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", headlineImage as File);
      formData.append("headline1", headline1);
      formData.append("headline2", headline2);
      formData.append("headline3", headline3);
      formData.append("seoTitle", seoTitle);
      formData.append("url", url);
      formData.append("category", JSON.stringify(selectedCategories));
      formData.append("keywords", JSON.stringify(selectedKeywords));
      formData.append("status", status);
      formData.append("content", content);
      formData.append("author", author);
      formData.append("isFeatured", String(isFeatured));
      formData.append("isSpecial", String(isSpecial));

      // Add scheduling information if scheduled
      if (publishOption === "schedule") {
        const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
        formData.append(
          "scheduledPublishDate",
          scheduledDateTime.toISOString()
        );
      }

      // Log the form data
      console.log("Form Data being sent:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await submitContent(formData);
      router.push("/admin/content");
    } catch (error: unknown) {
      console.error("Error submitting content:", error);
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data: unknown; status: number; headers: unknown };
        };
        console.error("Error response data:", axiosError.response?.data);
        console.error("Error response status:", axiosError.response?.status);
        console.error("Error response headers:", axiosError.response?.headers);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout pageTitle="CONTENT">
      <div className="bg-white p-4 rounded-lg ">
        <PageTitle title="Create content" />
        <div className="flex flex-col gap-4 mt-4">
          <div>
            <InputText text="Headline 1 (max 55 characters)" />
            <Textarea
              rows={2}
              value={headline1}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 55) {
                  setHeadline1(value);
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
                if (value.length <= 55) {
                  setHeadline1(value);
                }
              }}
              placeholder="Enter headline"
              className="hidden lg:block border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
            <p className="text-sm text-charcoal/60 mt-1">
              {headline1.length}/55 characters
            </p>
          </div>
          <div>
            <InputText text="Headline 2 (max 75 characters)" />
            <Textarea
              rows={2}
              value={headline2}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 75) {
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
                if (value.length <= 75) {
                  setHeadline2(value);
                }
              }}
              placeholder="Enter headline"
              className="hidden lg:block border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
            <p className="text-sm text-charcoal/60 mt-1">
              {headline2.length}/75 characters
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
            <InputText text="SEO Title (max 100 characters)" />
            <Textarea
              rows={2}
              value={seoTitle}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 100) {
                  setSeoTitle(value);
                  setUrl(generateUrl(value));
                }
              }}
              placeholder="Enter SEO title"
              className="lg:hidden border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
            <Input
              type="text"
              value={seoTitle}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 100) {
                  setSeoTitle(value);
                  setUrl(generateUrl(value));
                }
              }}
              placeholder="Enter SEO title"
              className="hidden lg:block border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
            <p className="text-sm text-charcoal/60 mt-1">
              {seoTitle.length}/100 characters
            </p>
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
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  console.log("File selected:", file.name); // Debug log
                  setHeadlineImage(file);
                }
              }}
              type="file"
              accept="image/*"
              className={`border ${
                headlineImage ? "border-primary" : "border-charcoal/60"
              } focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2`}
            />
            {headlineImage && (
              <p className="text-sm text-primary mt-1">
                ✓ Image selected: {headlineImage.name}
              </p>
            )}
          </div>

          <div>
            <InputText text="Categories (Select one or more)" />
            <div className="mt-2 grid grid-cols-2 gap-2">
              {categories.map((category, index) => {
                const isChecked = selectedCategories.some(
                  (cat) => cat.name === category.name
                );
                const selectedCat = selectedCategories.find(
                  (cat) => cat.name === category.name
                );
                return (
                  <div key={index} className="mb-2">
                    <label className="flex items-center space-x-2 cursor-pointer text-[14px]">
                      <input
                        type="checkbox"
                        name="category"
                        value={category.name}
                        checked={isChecked}
                        onChange={(e) =>
                          handleCategoryChange(category.name, e.target.checked)
                        }
                        className="form-checkbox text-primary focus:ring-primary/80"
                      />
                      <span className="text-charcoal">{category.label}</span>
                    </label>
                    {/* Show subcategory select if category has subCategories and is checked */}
                    {category.subCategories && isChecked && (
                      <select
                        className="mt-1 block w-full border border-charcoal/60 rounded px-2 py-1 text-sm"
                        value={selectedCat?.subCategory || ""}
                        onChange={(e) =>
                          handleSubCategoryChange(category.name, e.target.value)
                        }
                      >
                        <option value="">Select subcategory</option>
                        {category.subCategories.map((sub, idx) => (
                          <option key={idx} value={sub.name}>
                            {sub.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <KeywordsInput onKeywordsChange={handleKeywordsChange} />
          </div>

          <div>
            <InputText text="Special Options" />
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="specialOption"
                  value="featured"
                  checked={isFeatured}
                  onChange={() => {
                    setIsFeatured(true);
                    setIsSpecial(false);
                  }}
                  className="form-radio text-primary focus:ring-primary/80"
                />
                <span className="text-charcoal">Featured</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="specialOption"
                  value="special"
                  checked={isSpecial}
                  onChange={() => {
                    setIsSpecial(true);
                    setIsFeatured(false);
                  }}
                  className="form-radio text-primary focus:ring-primary/80"
                />
                <span className="text-charcoal">Special</span>
              </label>
            </div>
            <p className="text-sm text-charcoal/60 mt-1">
              Only one option can be selected at a time.
            </p>
          </div>

          <div>
            <label className="font-[600] text-[16px] text-charcoal">
              Content
            </label>
            <div className="mt-4">
              <RichTextEditor
                content={content}
                onChange={setContent}
                onImageUpload={handleRichTextImageUpload}
                isUploading={isImageUploading}
              />
            </div>
          </div>

          <div>
            <LabelText text="Once you've finished writing your news article:" />
            <LabelText text="- Click Preview to see how it will appear to readers." />
            <LabelText text="- Click Save as Draft if you're not ready to publish yet, your progress will be saved." />
            <LabelText text="- Click Publish to make this article live immediately." />
            <LabelText text="- Click Schedule to publish at a specific date and time." />
          </div>

          <div>
            <InputText text="Publishing Options" />
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="publishOption"
                    value="now"
                    checked={publishOption === "now"}
                    onChange={() => setPublishOption("now")}
                    className="form-radio text-primary focus:ring-primary/80"
                  />
                  <span className="text-charcoal">Publish Now</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="publishOption"
                    value="schedule"
                    checked={publishOption === "schedule"}
                    onChange={() => setPublishOption("schedule")}
                    className="form-radio text-primary focus:ring-primary/80"
                  />
                  <span className="text-charcoal">Schedule for Later</span>
                </label>
              </div>

              {publishOption === "schedule" && (
                <div className="flex gap-4">
                  <div>
                    <label className="block text-sm text-charcoal/60 mb-1">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      min={format(new Date(), "yyyy-MM-dd")}
                      className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-charcoal/60 mb-1">
                      Time
                    </label>
                    <Input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <Button
              className="bg-accent-teal text-white hover:bg-accent-teal/80 cursor-pointer"
              onClick={() => {
                // Prepare preview data
                const previewContent = {
                  headline1,
                  headline2,
                  headline3,
                  content,
                  headlineImage: headlineImage
                    ? URL.createObjectURL(headlineImage)
                    : "",
                  author,
                  category: selectedCategories,
                  keywords: selectedKeywords,
                  isFeatured,
                  isSpecial,
                };
                sessionStorage.setItem(
                  "previewContent",
                  JSON.stringify(previewContent)
                );
                router.push("/admin/content/preview");
              }}
            >
              <IconEye size={20} />
              Preview
            </Button>
            <Button
              className="bg-white text-primary border-primary border hover:bg-primary/10 cursor-pointer"
              variant="outline"
              onClick={() => handleSubmit("Draft")}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <IconLoader2 size={20} className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <IconNote size={20} />
                  Save as Draft
                </>
              )}
            </Button>
            {publishOption === "now" ? (
              <Button
                className="bg-primary text-white hover:bg-primary/80 cursor-pointer"
                onClick={() => handleSubmit("Published")}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <IconLoader2 size={20} className="animate-spin mr-2" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <IconBrowserShare size={20} />
                    Publish
                  </>
                )}
              </Button>
            ) : (
              <Button
                className="bg-primary text-white hover:bg-primary/80 cursor-pointer"
                onClick={() => handleSubmit("Draft")}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <IconLoader2 size={20} className="animate-spin mr-2" />
                    Scheduling...
                  </>
                ) : (
                  <>
                    <IconBrowserShare size={20} />
                    Schedule
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(CreateContent);
