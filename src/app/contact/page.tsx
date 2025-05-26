import PageLayout from "@/components/page-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | TamilMedia.lk",
  description:
    "Get in touch with TamilMedia.lk. Contact us for questions, suggestions, or feedback. We value your input and are here to help.",
  keywords: [
    "Contact TamilMedia",
    "TamilMedia.lk contact",
    "Sri Lanka Tamil news contact",
    "Tamil news support",
    "TamilMedia email",
    "TamilMedia phone",
  ],
  openGraph: {
    title: "Contact Us | TamilMedia.lk",
    description:
      "Get in touch with TamilMedia.lk. Contact us for questions, suggestions, or feedback.",
    url: "https://tamilmedia.lk/contact",
    siteName: "TamilMedia.lk",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <PageLayout title="Reach Out to Us ">
      <div className="space-y-6 font-rubik">
        <p>
          We&apos;d love to hear from you! Whether you have questions,
          suggestions, or just want to say hello, feel free to get in touch with
          us at TamilMedia.lk.
        </p>

        <p>
          Your feedback helps us improve and bring you the news that matters
          most. Don&apos;t hesitate to reach out - we&apos;re here to listen and
          assist you!
        </p>

        <p>Thank you for being part of our community.</p>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Email</h3>
              <a
                href="mailto:contact@tamilmedia.lk"
                className="text-primary hover:underline"
              >
                contact@tamilmedia.lk
              </a>
            </div>

            <div>
              <h3 className="font-medium">Phone</h3>
              <a
                href="tel:+94123456789"
                className="text-primary hover:underline"
              >
                +94 123 456 789
              </a>
            </div>

            <div>
              <h3 className="font-medium">Address</h3>
              <p className="text-gray-600">
                TamilMedia.lk
                <br />
                Colombo, Sri Lanka
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
