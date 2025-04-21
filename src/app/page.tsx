import NavBar from "../components/navbar";
import NewsCard from "../components/news-card";
import Trump from "../assets/images/sample-news.jpg";
import AdCard from "@/components/ad-card";
import adImage from "../assets/images/ad-card.jpg";
import Politics from "../assets/images/sample-news.jpg";
import Technology from "../assets/images/sample-news.jpg";
import Sports from "../assets/images/sample-news.jpg";
import Footer from "@/components/footer";

export default function Home() {
  const newsItems = [
    {
      id: "1",
      image: Trump,
      category: "විදෙස්",
      title:
        "ට්‍රම්ප් හාවර්ඩ් ඇතුළු ඇමෙරිකානු විශ්වවිද්‍යාල සඳහා අරමුදල් කපා දැමීමට සැරසෙන්නේ ඇයි?",
      author: "බීබීසී ලෝක සේවය",
      date: "17 අප්‍රේල් 2025",
    },
    {
      id: "2",
      image: Politics,
      category: "දේශපාලන",
      title:
        "ජනාධිපතිවරණ කිට්ටු වන විට ප්‍රධාන පක්ෂ නව සන්ධාන ගොඩනැගීමට සූදානම් වෙයි",
      author: "ලක්බිම පුවත්",
      date: "16 අප්‍රේල් 2025",
    },
    {
      id: "3",
      image: Technology,
      category: "තාක්ෂණික",
      title: "ශ්‍රී ලංකාවේ නිපදවූ නව AI තාක්ෂණය ජාත්‍යන්තර සම්මාන දිනා ගනී",
      author: "දිනමිණ",
      date: "15 අප්‍රේල් 2025",
    },
    {
      id: "4",
      image: Sports,
      category: "ක්‍රීඩා",
      title:
        "ශ්‍රී ලංකා ක්‍රිකට් කණ්ඩායම නව පුහුණුකරුවෙකු යටතේ අභියෝගාත්මක සංචාරයකට සූදානම් වෙයි",
      author: "ලංකාදීප",
      date: "14 අප්‍රේල් 2025",
    },
    {
      id: "5",
      image: Trump,
      category: "ආර්ථික",
      title: "රුපියලේ වටිනාකම ගෙවීමේ ශේෂය වැඩි කිරීමට මහ බැංකුව තීරණය කරයි",
      author: "ආර්ථික පුවත්",
      date: "13 අප්‍රේල් 2025",
    },
    {
      id: "6",
      image: Politics,
      category: "සෞඛ්‍ය",
      title:
        "නව කොරෝනා වෛරස් ප්‍රභේදයක් හඳුනාගෙන ඇති බව සෞඛ්‍ය අමාත්‍යාංශය තහවුරු කරයි",
      author: "සෞඛ්‍ය පුවත්",
      date: "12 අප්‍රේල් 2025",
    },
  ];

  const adItems = [
    {
      id: "ad1",
      image: adImage,
      title:
        "This Brilliant Japanese Invention Instantly Translates Foreign Languages",
      brand: "Enence",
    },
    {
      id: "ad2",
      image: adImage,
      title: "Premium Quality Ceylon Tea - Now Available Worldwide",
      brand: "CeylonTea Co.",
    },
    {
      id: "ad3",
      image: adImage,
      title: "New Smartphone with Revolutionary Camera Technology",
      brand: "TechVision",
    },
  ];

  const combinedItems = [];
  let newsIndex = 0;
  let adIndex = 0;

  while (newsIndex < newsItems.length) {
    // Add up to 3 news items
    for (let i = 0; i < 3 && newsIndex < newsItems.length; i++) {
      combinedItems.push({
        type: "news",
        data: newsItems[newsIndex++],
      });
    }

    // Add 1 ad if available
    if (adIndex < adItems.length) {
      combinedItems.push({
        type: "ad",
        data: adItems[adIndex++],
      });
    }
  }

  return (
    <main>
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {combinedItems.map((item) =>
            item.type === "news" ? (
              <NewsCard
                key={item.data.id}
                id={item.data.id}
                image={item.data.image}
                category={"category" in item.data ? item.data.category : ""}
                title={item.data.title}
                author={"author" in item.data ? item.data.author : ""}
                date={"date" in item.data ? item.data.date : "N/A"}
              />
            ) : (
              <AdCard
                key={item.data.id}
                image={item.data.image}
                title={item.data.title}
                brand={"brand" in item.data ? item.data.brand : ""}
              />
            )
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
