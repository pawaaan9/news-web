import PageLayout from '@/components/page-layout';

export default function CookieSettingsPage() {
  return (
    <PageLayout title="Cookie Settings">
      <div className="space-y-6">
        <p>
          At TamilMedia.lk, we use cookies to make your experience better and faster. Cookies help us understand how you use our site and improve the content we share with you.
        </p>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">What are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device when you visit our website. They help us remember your preferences and make your browsing experience smoother.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">How We Use Cookies</h2>
            <p>
              We use cookies to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Remember your preferences</li>
              <li>Understand how you use our website</li>
              <li>Improve our content and services</li>
              <li>Make your browsing experience faster and more efficient</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Managing Your Cookie Preferences</h2>
            <p>
              You can choose your cookie preferences anytime. If you want to accept all cookies or manage them, just click on the settings option in your browser.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Privacy Matters</h2>
            <p>
              Don't worry - your privacy is important to us, and we only use cookies to make your visit smooth and enjoyable.
            </p>
          </div>
        </div>
        
        <p className="mt-8">
          Thank you for visiting TamilMedia.lk!
        </p>
      </div>
    </PageLayout>
  );
} 