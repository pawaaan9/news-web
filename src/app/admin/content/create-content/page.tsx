"use client";

import { PageTitle } from "@/modules/shared/page-title";
import AdminLayout from "../../admin-layout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { InputText } from "@/modules/shared/input-text";
import { categories } from "@/data/categories";
import { useState } from "react";
import KeywordsInput from "@/modules/content/keyword-input";
import { Button } from "@/components/ui/button";
import {
  IconBrowserShare,
  IconCamera,
  IconEye,
  IconNote,
  IconTextWrap,
} from "@tabler/icons-react";
import { LabelText } from "@/modules/shared/label-text";

const CreateContent = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  console.log("Selected Keywords:", selectedKeywords);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordsChange = (keywords: string[]) => {
    setSelectedKeywords(keywords);
  };

  const [contentBlocks, setContentBlocks] = useState<
    { type: "paragraph" | "image"; id: number }[]
  >([{ type: "paragraph", id: 1 }]); // Initial block is a paragraph

  const addParagraph = () => {
    setContentBlocks([
      ...contentBlocks,
      { type: "paragraph", id: contentBlocks.length + 1 },
    ]);
  };

  const addImage = () => {
    setContentBlocks([
      ...contentBlocks,
      { type: "image", id: contentBlocks.length + 1 },
    ]);
  };

  return (
    <AdminLayout pageTitle="CONTENT">
      <div className="bg-white p-4 rounded-lg ">
        <PageTitle title="Create content" />
        <div className="flex flex-col gap-4 mt-4">
          <div>
            <InputText text="Headline" />
            <Textarea
              rows={2}
              id="headline"
              placeholder="Enter headline"
              className="lg:hidden border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
            <Input
              type="text"
              id="headline"
              placeholder="Enter headline"
              className="hidden lg:block border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
          </div>
          <div>
            <InputText text="URL (Auto generated from title)" />
            <Textarea
              rows={2}
              id="url"
              className="lg:hidden border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
            <Input
              type="text"
              id="url"
              className="hidden lg:block border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none  focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
            />
          </div>

          <div>
            <InputText text="Headline image" />
            <Input
              id="url"
              type="file"
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
                        className="border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
                      />
                    </div>
                  ) : (
                    <div>
                      <InputText text="Image" />
                      <Input
                        type="file"
                        className="border border-charcoal/60 focus:border-primary/80 focus:ring-0 focus:outline-none focus-visible:border-primary/80 focus-visible:ring-0 mt-2"
                      />
                    </div>
                  )}
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
            <Button className="bg-accent-teal text-white hover:bg-accent-teal/80">
              <IconEye size={20} />
              Preview
            </Button>
            <Button
              className="bg-white text-primary border-primary border hover:bg-primary/10"
              variant="outline"
            >
              <IconNote size={20} />
              Save as Draft
            </Button>
            <Button className="bg-primary text-white hover:bg-primary/80">
              <IconBrowserShare size={20} /> Publish
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateContent;
