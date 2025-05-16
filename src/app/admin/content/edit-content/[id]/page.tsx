"use client";

import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../../../admin-layout";
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
import { getContentById, updateContent } from "@/api/content.api";
import { useRouter } from "next/navigation";
import withAuth from "@/hoc/with-auth";
import { format } from "date-fns";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import axios from "axios";
import { use } from "react";
import Image from "next/image";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

interface ImageUploadResponse {
  status: string;
  urls: string[];
}

interface ContentResponse {
  data: {
    headline1: string;
    headline2: string;
    headline3: string;
    url: string;
    headlineImage: string;
    seoTitle: string;
    content: string;
    author: string;
    isFeatured: boolean;
    isSpecial: boolean;
    category: Array<{ name: string; subCategory?: string }>;
    keywords: string[];
  }
}

const EditContent = (props: { params: Promise<{ id: string }> }) => {
  const params = use(props.params);
  const [selectedCategories, setSelectedCategories] = useState<{ name: string; subCategory?: string }[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [headline1, setHeadline1] = useState("");
  const [headline2, setHeadline2] = useState("");
  const [headline3, setHeadline3] = useState("");
  const [url, setUrl] = useState("");
  const [headlineImage, setHeadlineImage] = useState<File | null>(null);
  const [currentHeadlineImage, setCurrentHeadlineImage] = useState<string>("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);
  const [seoTitle, setSeoTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const response = await getContentById(params.id) as ContentResponse;
        const data = response.data;
        
        setHeadline1(data.headline1);
        setHeadline2(data.headline2);
        setHeadline3(data.headline3 || "");
        setUrl(data.url);
        setCurrentHeadlineImage(data.headlineImage);
        setSeoTitle(data.seoTitle);
        setContent(data.content || "");
        setAuthor(data.author);
        setIsFeatured(data.isFeatured);
        setIsSpecial(data.isSpecial);
        
        if (Array.isArray(data.category)) {
          const parsedCategories = data.category.map((cat: any) => {
            if (typeof cat === 'string') {
              return { name: cat };
            }
            return cat;
          });
          setSelectedCategories(parsedCategories);
        }
        
        if (Array.isArray(data.keywords?.[0])) {
          setSelectedKeywords(data.keywords[0]);
        } else {
          setSelectedKeywords(data.keywords || []);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [params.id]);

  const handleKeywordsChange = (keywords: string[]) => {
    setSelectedKeywords(keywords);
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('images', file);

    try {
      const response = await axios.post<ImageUploadResponse>(`${API_URL}/content/upload/rich-text`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.status === 'success' && response.data.urls && response.data.urls.length > 0) {
        return response.data.urls[0]; // Return the first URL from the array
      } else {
        throw new Error('No image URL received from server');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
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

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, { name: categoryName }]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat.name !== categoryName)
      );
    }
  };

  const handleSubCategoryChange = (categoryName: string, subCategory: string) => {
    setSelectedCategories(
      selectedCategories.map((cat) =>
        cat.name === categoryName ? { ...cat, subCategory } : cat
      )
    );
  };

  const handleSubmit = async (status: "Draft" | "Published") => {
    if (!selectedCategories.length) {
      alert("Category is required.");
      return;
    }

    try {
      const formData = new FormData();
      if (headlineImage) {
        formData.append('headlineImage', headlineImage as File);
      }
      formData.append('headline1', headline1);
      formData.append('headline2', headline2);
      formData.append('headline3', headline3);
      formData.append('seoTitle', seoTitle);
      formData.append('url', url);
      formData.append('category', JSON.stringify(selectedCategories));
      formData.append('keywords', JSON.stringify(selectedKeywords));
      formData.append('status', status);
      formData.append('content', content);
      formData.append('author', author);
      formData.append('isFeatured', String(isFeatured));
      formData.append('isSpecial', String(isSpecial));

      await updateContent(params.id, {
        headline1,
        headline2,
        headline3,
        url,
        category: JSON.stringify(selectedCategories),
        status,
        content,
        author,
        isFeatured,
        isSpecial,
        ...(headlineImage && { headlineImage: URL.createObjectURL(headlineImage) })
      });

      router.push("/admin/content");
    } catch (error) {
      console.error("Error submitting content:", error);
    }
  };

  return (
    <AdminLayout pageTitle="CONTENT">
      <div className="bg-white p-4 rounded-lg ">
        <PageTitle title="Edit content" />
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-charcoal">Loading content...</div>
          </div>
        ) : (
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
              {currentHeadlineImage && (
                <div className="mt-2 mb-2 relative w-full h-48">
                  <Image 
                    src={currentHeadlineImage} 
                    alt="Current headline" 
                    fill
                    className="object-contain rounded"
                  />
                </div>
              )}
              <Input
                onChange={(e) => setHeadlineImage(e.target.files?.[0] || null)}
                type="file"
                accept="image/*"
                className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
              />
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
              <KeywordsInput 
                onKeywordsChange={handleKeywordsChange} 
                initialKeywords={selectedKeywords}
              />
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
                  onImageUpload={handleImageUpload}
                />
              </div>
            </div>

            <div className="mt-8">
              <label className="font-[600] text-[16px] text-charcoal mb-4 block">
                Content Preview
              </label>
              <div 
                className="prose max-w-none p-4 border border-charcoal/20 rounded-lg h-[500px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            <div>
              <LabelText text="Once you've finished editing your news article:" />
              <LabelText text="- Click Preview to see how it will appear to readers." />
              <LabelText text="- Click Save as Draft if you're not ready to publish yet, your progress will be saved." />
              <LabelText text="- Click Publish to make this article live immediately." />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mt-4">
              <Button 
                className="bg-accent-teal text-white hover:bg-accent-teal/80 cursor-pointer"
                onClick={() => {
                  const params = new URLSearchParams({
                    headline1,
                    headline2,
                    headline3,
                    content,
                    headlineImage: currentHeadlineImage,
                    author,
                    category: JSON.stringify(selectedCategories),
                    keywords: JSON.stringify(selectedKeywords),
                    isFeatured: String(isFeatured),
                    isSpecial: String(isSpecial)
                  });
                  router.push(`/admin/content/preview?${params.toString()}`);
                }}
              >
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
        )}
      </div>
    </AdminLayout>
  );
};

export default withAuth(EditContent as React.ComponentType); 