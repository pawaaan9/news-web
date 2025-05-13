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

interface ImageUploadResponse {
  url: string;
}

const CreateContent = () => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
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
  const router = useRouter();

  const handleKeywordsChange = (keywords: string[]) => {
    setSelectedKeywords(keywords);
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post<ImageUploadResponse>(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleRichTextImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('images', file);

    try {
      const response = await axios.post<ImageUploadResponse>(`${API_URL}/content/upload/rich-text`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.url;
    } catch (error) {
      console.error('Error uploading rich text image:', error);
      throw error;
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
    if (!selectedCategory) {
      alert("Category is required.");
      return;
    }

    if (!headlineImage) {
      alert("Headline image is required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', headlineImage as File);
      formData.append('headline1', headline1);
      formData.append('headline2', headline2);
      formData.append('headline3', headline3);
      formData.append('seoTitle', seoTitle);
      formData.append('url', url);
      formData.append('category', JSON.stringify(selectedCategory));
      formData.append('keywords', JSON.stringify(selectedKeywords));
      formData.append('status', status);
      formData.append('content', content);
      formData.append('author', author);
      formData.append('isFeatured', String(isFeatured));
      formData.append('isSpecial', String(isSpecial));

      // Log the form data
      console.log('Form Data being sent:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await submitContent(formData);
      router.push("/admin/content");
    } catch (error: any) {
      console.error("Error submitting content:", error);
      // Log more details about the error
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      }
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
              onChange={(e) => setHeadlineImage(e.target.files?.[0] || null)}
              type="file"
              accept="image/*"
              className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
          </div>

          <div>
            <InputText text="Categories (Select one or more)" />
            <div className="mt-2 grid grid-cols-2">
              {categories.map((category, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 mb-2 cursor-pointer text-[14px]"
                >
                  <input
                    type="checkbox"
                    name="category"
                    value={category}
                    checked={selectedCategory.includes(category)}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        setSelectedCategory([...selectedCategory, value]);
                      } else {
                        setSelectedCategory(
                          selectedCategory.filter((cat) => cat !== value)
                        );
                      }
                    }}
                    className="form-checkbox text-primary focus:ring-primary/80"
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
              />
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