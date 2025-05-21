import type { Metadata } from "next";
import PageLayout from "@/components/page-layout";

export const metadata: Metadata = {
  title: "User Guidelines | TamilMedia.lk",
  description:
    "Read the user guidelines for TamilMedia.lk. Learn how to use our Tamil news website safely, respectfully, and responsibly.",
  keywords: [
    "User guidelines",
    "TamilMedia.lk rules",
    "Tamil news website usage",
    "Safe browsing",
    "Copyright",
    "Report issues",
  ],
  openGraph: {
    title: "User Guidelines | TamilMedia.lk",
    description:
      "Read the user guidelines for TamilMedia.lk. Learn how to use our Tamil news website safely, respectfully, and responsibly.",
    url: "https://tamilmedia.lk/user-guidelines",
    siteName: "TamilMedia.lk",
    type: "website",
  },
};

export default function UserGuidelinesPage() {
  return (
    <PageLayout title="User Guidelines">
      <div className="space-y-6">
        <p>
          Welcome to TamilMedia.lk! We&apos;re happy to have you here. To ensure
          a smooth and enjoyable experience, please keep these simple guidelines
          in mind:
        </p>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Read and Enjoy</h2>
            <p>
              Our site is designed for you to read and stay updated with the
              latest news in Tamil. Feel free to explore all our articles at
              your own pace.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Respect Copyright</h2>
            <p>
              Please do not copy or share our content without permission. We
              work hard to bring you quality news and appreciate your respect
              for our work.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Stay Safe Online</h2>
            <p>
              While browsing, avoid sharing personal information on any public
              platforms or external sites.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Report Issues</h2>
            <p>
              If you notice any problems with the site or content, please
              contact us. We&apos;re here to help and improve your experience.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
