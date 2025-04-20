import NavBar from "../components/navbar";
import NewsCard from "../components/news-card";
import Trump from "../assets/images/sample-news.jpg";
import AdCard from "@/components/ad-card";
import adImage from "../assets/images/ad-card.jpg";

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="mt-10 max-w-4xl mx-auto">
        <NewsCard
          image={Trump}
          category="විදෙස්"
          title="ට්‍රම්ප් හාවර්ඩ් ඇතුළු ඇමෙරිකානු විශ්වවිද්‍යාල සඳහා අරමුදල් කපා දැමීමට සැරසෙන්නේ ඇයි?"
          description="හාවර්ඩ් විශ්වවිද්‍යාලය විසින් ධවල මන්දිරයෙන් ඉදිරිපත් කරන ලද ඉල්ලීම් ලැයිස්තුවක් ප්‍රතික්ෂේප කිරීමෙන් පැය කිහිපයකට පසු, එම කීර්තිමත් විශ්වවිද්‍යාලය සඳහා ෆෙඩ්රල් අරමුදල්වලින් ඇමෙරිකානු ඩොලර් බිලියන 2කට වඩා අත්හිටුවන බව ඩොනල්ඩ් ට්‍රම්ප් පරිපාලනය පැවසීය."
          author="බීබීසී ලෝක සේවය"
          date="17 අප්‍රේල් 2025"
        />
      </div>
      <div className="mt-10 max-w-4xl mx-auto">
      <AdCard
          image={adImage}
          title="This Brilliant Japanese Invention Instantly Translates Foreign Languages"
          brand="Enence"
        />
      </div>
    </main>
  );
}
