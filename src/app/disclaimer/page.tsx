import type { Metadata } from "next";
import PageLayout from "@/components/page-layout";

export const metadata: Metadata = {
  title: "Disclaimer | TamilMedia.lk",
  description:
    "Read the disclaimer for TamilMedia.lk. Learn about the accuracy, liability, and opinions presented on our Tamil news website.",
  keywords: [
    "Disclaimer",
    "TamilMedia.lk disclaimer",
    "Tamil news accuracy",
    "Sri Lanka Tamil news",
    "Content liability",
    "News opinions",
  ],
  openGraph: {
    title: "Disclaimer | TamilMedia.lk",
    description:
      "Read the disclaimer for TamilMedia.lk. Learn about the accuracy, liability, and opinions presented on our Tamil news website.",
    url: "https://tamilmedia.lk/disclaimer",
    siteName: "TamilMedia.lk",
    type: "website",
  },
};

export default function DisclaimerPage() {
  return (
    <PageLayout title="Disclaimer">
      <div className="space-y-6">
        <p>
          Welcome to TamilMedia.lk! We want to be clear and honest with you
          about the information we share on our site.
        </p>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">General Information</h2>
            <p>
              The news and articles on TamilMedia.lk are for general information
              only. We try our best to provide accurate and up-to-date content,
              but sometimes things may change or we might make mistakes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">No Liability</h2>
            <p>
              TamilMedia.lk is not responsible for any decisions you make based
              on the information on our site. Please verify important details
              from official sources when needed.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Content and Opinions</h2>
            <p>
              Some content may include opinions or views of the authors and do
              not necessarily reflect the views of TamilMedia.lk as a whole.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Website Availability</h2>
            <p>
              We do not guarantee that our website will always be available or
              error-free, but we work hard to keep it running smoothly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Agreement</h2>
            <p>By using TamilMedia.lk, you agree to these terms.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p>
              Thank you for reading and trusting TamilMedia.lk. If you have any
              questions, feel free to contact us!
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
