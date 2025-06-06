import { getContentByUrl } from "@/api/content.api";
import NavBar from "@/components/navbar";
import ClientWrapper from "./client-wrapper";
import { generateMetadata } from "./page.metadata";

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

export { generateMetadata };

export default async function NewsView({
  params,
}: {
  params: { url: string };
}) {
  try {
    const response = await getContentByUrl(params.url);
    const article = (response as { data: Article }).data;

    if (!article) {
      return (
        <main>
          <NavBar onCategorySelect={() => {}} selectedCategory={null} />
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center py-10">
              <p className="text-red-500">Article not found</p>
            </div>
          </div>
        </main>
      );
    }

    return <ClientWrapper article={article} />;
  } catch (error) {
    return (
      <main>
        <NavBar onCategorySelect={() => {}} selectedCategory={null} />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-10">
            <p className="text-red-500">Failed to load article</p>
          </div>
        </div>
      </main>
    );
  }
}
