import PageLayout from "@/components/page-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Protection | TamilMedia.lk",
  description:
    "Learn how TamilMedia.lk protects your privacy. We do not collect personal data and are committed to providing a safe news experience.",
  keywords: [
    "Data protection",
    "TamilMedia.lk privacy",
    "No personal data collection",
    "Sri Lanka Tamil news privacy",
    "User privacy",
    "Safe news website",
  ],
  openGraph: {
    title: "Data Protection | TamilMedia.lk",
    description:
      "Learn how TamilMedia.lk protects your privacy. We do not collect personal data and are committed to providing a safe news experience.",
    url: "https://tamilmedia.lk/data-protection",
    siteName: "TamilMedia.lk",
    type: "website",
  },
};

export default function DataProtectionPage() {
  return (
    <PageLayout title="Data Protection">
      <div className="space-y-6 font-rubik">
        <p>
          At TamilMedia.lk, we respect your privacy. Since our site does not
          require registration or login, you can read all our news articles
          freely without sharing any personal information.
        </p>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Our Commitment to Privacy
            </h2>
            <p>
              We do not collect or store any personal data from our readers. Our
              main goal is to provide you with the latest news in a safe and
              secure environment.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              What We Don&apos;t Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal identification information</li>
              <li>Contact details</li>
              <li>Browsing history</li>
              <li>Location data</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Third-Party Services</h2>
            <p>
              While we strive to keep our website free from unnecessary
              tracking, some third-party services (like analytics) may use
              cookies to help us understand how our website is used. These
              services are used only to improve your experience.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Access any personal data we might have about you</li>
              <li>Request deletion of your data</li>
              <li>Opt out of any data collection</li>
              <li>Ask questions about how we handle data</li>
            </ul>
          </div>
        </div>

        <p className="mt-8">
          If you have any questions about privacy or how we handle data, please
          feel free to contact us.
        </p>

        <p>Thank you for visiting TamilMedia.lk!</p>
      </div>
    </PageLayout>
  );
}
