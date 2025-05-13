"use client";

import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const PreviewPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get all the content data from URL params
  const headline1 = searchParams.get("headline1") || "";
  const headline2 = searchParams.get("headline2") || "";
  const headline3 = searchParams.get("headline3") || "";
  const content = searchParams.get("content") || "";
  const headlineImage = searchParams.get("headlineImage") || "";
  const author = searchParams.get("author") || "";
  const category = searchParams.get("category") ? JSON.parse(searchParams.get("category")!) : [];
  const keywords = searchParams.get("keywords") ? JSON.parse(searchParams.get("keywords")!) : [];
  const isFeatured = searchParams.get("isFeatured") === "true";
  const isSpecial = searchParams.get("isSpecial") === "true";

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => router.back()}
        >
          <IconArrowLeft size={20} className="mr-2" />
          Back to Editor
        </Button>

        <article className="prose max-w-none">
          {/* Headlines */}
          <h1 className="text-4xl font-bold mb-4">{headline1}</h1>
          {headline2 && <h2 className="text-2xl text-gray-600 mb-4">{headline2}</h2>}
          {headline3 && <h3 className="text-xl text-gray-500 mb-4">{headline3}</h3>}

          {/* Meta information */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
            <span>{author}</span>
            <span>•</span>
            <span>{format(new Date(), "MMMM d, yyyy")}</span>
            {category.length > 0 && (
              <>
                <span>•</span>
                <span>{category.join(", ")}</span>
              </>
            )}
          </div>

          {/* Featured image */}
          {headlineImage && (
            <div className="mb-8">
              <img
                src={headlineImage}
                alt={headline1}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          {/* Content */}
          <div dangerouslySetInnerHTML={{ __html: content }} />

          {/* Keywords */}
          {keywords.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h4 className="text-sm font-semibold mb-4">Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword: string, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default PreviewPage; 