"use client";

import { useState, useEffect, ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import NavBar from "../../../components/navbar";
import AdCard from "../../../components/ad-card";
import adImage from "@/assets/images/ad-card.jpg";
import Trump from "@/assets/images/sample-news.jpg";
import Politics from "@/assets/images/sample-news.jpg";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data for all news articles
const allNewsArticles = [
  {
    id: "1",
    image: Trump,
    category: "විදෙස්",
    title:
      "ට්‍රම්ප් හාවර්ඩ් ඇතුළු ඇමෙරිකානු විශ්වවිද්‍යාල සඳහා අරමුදල් කපා දැමීමට සැරසෙන්නේ ඇයි?",
    fullContent: `හාවර්ඩ් විශ්වවිද්‍යාලය විසින් ධවල මන්දිරයෙන් ඉදිරිපත් කරන ලද ඉල්ලීම් ලැයිස්තුවක් ප්‍රතික්ෂේප කිරීමෙන් පැය කිහිපයකට පසු, එම කීර්තිමත් විශ්වවිද්‍යාලය සඳහා ෆෙඩ්රල් අරමුදල්වලින් ඇමෙරිකානු ඩොලර් බිලියන 2කට වඩා අත්හිටුවන බව ඩොනල්ඩ් ට්‍රම්ප් පරිපාලනය පැවසීය.

    හාවර්ඩ් විශ්වවිද්‍යාලය මෑත කාලයේ අන්තවාදී විරෝධතාවලට මුහුණ දුන් අතර විශ්වවිද්‍යාල පරිශ්‍රය තුළ යහුදා විරෝධී අදහස් ඉදිරිපත් කිරීම සඳහා සිසුන්ට ඉඩ දීම ගැන විවේචන එල්ල විය.

    මේ අතර, ට්‍රම්ප් පරිපාලනය විසින් හාවර්ඩ් විශ්වවිද්‍යාලයෙන් ඊශ්‍රායල් විරෝධී අදහස් වැළැක්වීමට විශේෂ පියවර ගන්නා ලෙස ඉල්ලා සිටි නමුත් එය ප්‍රතික්ෂේප කිරීමෙන් පසු මෙම තීරණය ගෙන ඇත.`,
    author: "බීබීසී ලෝක සේවය",
    date: "17 අප්‍රේල් 2025",
  },
  {
    id: "2",
    image: Politics,
    category: "දේශපාලන",
    title:
      "ජනාධිපතිවරණ කිට්ටු වන විට ප්‍රධාන පක්ෂ නව සන්ධාන ගොඩනැගීමට සූදානම් වෙයි",
    fullContent: `ලබන වසරේ පැවැත්වීමට නියමිත ජනාධිපතිවරණය සඳහා ප්‍රධාන දේශපාලන පක්ෂ නව සන්ධාන ගොඩනැගීමේ සාකච්ඡා ආරම්භ කර ඇත. පක්ෂ නායකයින් අතර රහස් සාකච්ඡා ආරම්භ වී ඇති බව වාර්තා වේ.
    
    දේශපාලන විශ්ලේෂකයින් පවසන පරිදි, මෙම සන්ධාන ගිවිසුම් රටේ දේශපාලන භූමිකාව වෙනස් කරන තීරණාත්මක සංවර්ධනයක් විය හැකිය. විපක්ෂ නායකයින් අතර එක්සත් පෙරමුණක් ගොඩනැගීමට උත්සාහ ගන්නා බවට තොරතුරු ඇත.
    
    ජනාධිපතිවරණය සඳහා තවමත් නිල වශයෙන් දිනයක් ප්‍රකාශයට පත් නොකළද, එය ලබන වසරේ පළමු කාර්තුවේදී පැවැත්වෙනු ඇතැයි අපේක්ෂා කෙරේ.`,
    author: "ලක්බිම පුවත්",
    date: "16 අප්‍රේල් 2025",
  },
];

export default function NewsView() {
  const params = useParams();
  const id = params.id; // Get the "id" from the dynamic route

  const [article, setArticle] = useState<{
    id: string;
    image: StaticImageData;
    category: string;
    title: string;
    fullContent: string;
    author: string;
    date: string;
  } | null>(null);
  const [relatedNews, setRelatedNews] = useState<
    {
      description: ReactNode;
      id: string;
      image: StaticImageData;
      category: string;
      title: string;
      fullContent: string;
      author: string;
      date: string;
    }[]
  >([]);

  useEffect(() => {
    if (id) {
      // Find the current article
      const currentArticle = allNewsArticles.find((item) => item.id === id);
      setArticle(currentArticle || null);

      // Find related news (same category, excluding current article)
      if (currentArticle) {
        const related = allNewsArticles
          .filter(
            (item) =>
              item.category === currentArticle.category && item.id !== id
          )
          .slice(0, 2)
          .map((item) => ({
            ...item,
            description: item.fullContent.substring(0, 100) + "...", // Add a derived description
          }));
        setRelatedNews(related);
      }
    }
  }, [id]);

  if (!article) {
    return (
      <main>
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>පුවත් ලිපිය ලබා ගැනීමට...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="text-xs mb-4">
          <Link href="/" className="text-blue-500 hover:underline">
            Home
          </Link>{" "}
          &gt;
          <Link
            href={`/?category=${article.category}`}
            className="text-blue-500 hover:underline ml-1"
          >
            {article.category}
          </Link>{" "}
          &gt;
          <span className="text-gray-700 ml-1">
            {article.title.substring(0, 20)}...
          </span>
        </div>

        {/* Article Header */}
        <div className="mb-6">
          <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded mb-2">
            {article.category}
          </span>
          <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span className="font-medium">{article.author}</span> විසින් •{" "}
            {article.date}
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-80 mb-6 rounded-lg overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="prose max-w-none mb-8">
          {article.fullContent.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-800 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Advertisement */}
        <div className="my-8">
          <AdCard
            image={adImage}
            title="This Brilliant Japanese Invention Instantly Translates Foreign Languages"
            brand="Enence"
          />
        </div>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">තවත් පුවත්</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedNews.map((news) => (
                <Link href={`/news/${news.id}`} key={news.id} passHref>
                  <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-300">
                    <div className="relative w-full h-40">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white/80 text-xs px-2 py-0.5 rounded">
                        {news.category}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold mb-1 leading-snug">
                        {news.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-3">
                        {news.description}
                      </p>
                      <div className="text-[10px] text-gray-500">
                        <span className="font-medium">{news.author}</span>{" "}
                        විසින් • {news.date}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
