"use client";

import { useRouter } from "next/navigation";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import ArticleContent from "./article-content";

interface Article {
  _id: string;
  url: string;
  headline1: string;
  headline2: string;
  headline3?: string;
  content: string;
  headlineImage?: string;
  author: string;
  category: { name: string; subCategory?: string }[] | string;
  keywords: string[] | string;
  createdTime: string;
  isFeatured?: boolean;
  isSpecial?: boolean;
}

interface ClientWrapperProps {
  article: Article;
}

export default function ClientWrapper({ article }: ClientWrapperProps) {
  const router = useRouter();

  const handleCategorySelect = (category: string | null) => {
    if (category) {
      router.push(`/?category=${encodeURIComponent(category)}`);
    } else {
      router.push("/");
    }
  };

  return (
    <main className="font-dmSans bg-gray-100 mt-[120px] lg:mt-[160px] py-6">
      <NavBar onCategorySelect={handleCategorySelect} selectedCategory={null} />
      <ArticleContent article={article} />
      <Footer />
    </main>
  );
} 