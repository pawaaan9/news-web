import PageLayout from "@/components/page-layout";

export default function ContactPage() {
  return (
    <PageLayout title="Reach Out to Us">
      <div className="space-y-6">
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
