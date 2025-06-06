import { getContentByUrl } from "@/api/content.api";
import type { Metadata } from "next";

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

export async function generateMetadata({
  params,
}: {
  params: { url: string };
}): Promise<Metadata> {
  try {
    const response = await getContentByUrl(params.url);
    const article = (response as { data: Article | null }).data;

    if (!article) {
      return {
        title: "News Not Found | TamilMedia.lk",
        description: "This news article could not be found.",
      };
    }

    // Prepare keywords
    let keywords: string[] = [];
    if (Array.isArray(article.keywords)) {
      keywords = article.keywords;
    } else if (typeof article.keywords === "string") {
      keywords = article.keywords.split(",").map((k: string) => k.trim());
    }
    if (Array.isArray(article.category)) {
      keywords.push(...article.category.map((c: any) => c.name));
    } else if (typeof article.category === "string") {
      keywords.push(article.category);
    }

    const articleUrl = `https://tamilmedia.lk/news/${article.url}`;
    const description = article.headline3 || article.headline2 || article.headline1;

    return {
      title: `${article.headline1} | TamilMedia.lk`,
      description,
      keywords,
      openGraph: {
        title: article.headline1,
        description,
        url: articleUrl,
        siteName: "TamilMedia.lk",
        images: article.headlineImage
          ? [
              {
                url: article.headlineImage,
                width: 1280,
                height: 720,
                alt: article.headline1,
              },
            ]
          : [],
        type: "article",
        locale: "ta_IN",
        authors: [article.author],
        publishedTime: article.createdTime,
        modifiedTime: article.createdTime,
      },
      twitter: {
        card: "summary_large_image",
        title: article.headline1,
        description,
        images: article.headlineImage ? [article.headlineImage] : [],
      },
      alternates: {
        canonical: articleUrl,
      },
    };
  } catch {
    return {
      title: "News Not Found | TamilMedia.lk",
      description: "This news article could not be found.",
    };
  }
}
