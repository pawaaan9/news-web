import PageLayout from "@/components/page-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | TamilMedia.lk",
  description:
    "We are your trusted source for the latest news, stories, and updates from Sri Lanka and around the world - all in Tamil. Our goal is to bring you accurate, timely, and easy-to-understand news that keeps you informed and connected.",
  keywords: [
    "about TamilMedia",
    "TamilMedia.lk about",
    "Sri Lanka Tamil news about",
    "Tamil news support",
    "TamilMedia email",
    "TamilMedia phone",
  ],
  openGraph: {
    title: "about Us | TamilMedia.lk",
    description:
      "Get in touch with TamilMedia.lk. about us for questions, suggestions, or feedback.",
    url: "https://tamilmedia.lk/about",
    siteName: "TamilMedia.lk",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <PageLayout title="About Us">
      <div className="space-y-6 font-rubik">
        <p>Welcome to TamilMedia.lk!</p>

        <p>
          We are your trusted source for the latest news, stories, and updates
          from Sri Lanka and around the world - all in Tamil. Our goal is to
          bring you accurate, timely, and easy-to-understand news that keeps you
          informed and connected.
        </p>

        <p>
          At TamilMedia.lk, we believe everyone deserves access to news that
          matters, delivered with honesty and care. Whether it&apos;s politics,
          entertainment, sports, or community events, we cover it all with a
          friendly approach that feels like talking to a neighbor.
        </p>

        <p>
          Thank you for being part of our growing family. Stay tuned, stay
          informed, and let&apos;s explore the world together!
        </p>
      </div>
    </PageLayout>
  );
}
