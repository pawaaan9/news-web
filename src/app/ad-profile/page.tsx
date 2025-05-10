"use client";

import AdProfileLinks from "../../components/ad-profile-links";

export default function AdProfile() {
  // Example profile data - replace with your actual data
  const profileData = {
    title: "Sri Durga Devi Devasthanam",
    email: "drpksamy23@gmail.com",
    phone: "+94112342463",
    whatsapp: "+94770578604",
    facebook: "https://www.facebook.com/Dr.pk.samy",
    twitter: "https://twitter.com/drpksamy",
    instagram: "https://instagram.com/drpksamy",
    linkedin: "https://linkedin.com/in/drpksamy",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="w-full px-4 py-6 md:px-[10%]">
        <AdProfileLinks
          title={profileData.title}
          email={profileData.email}
          phone={profileData.phone}
          whatsapp={profileData.whatsapp}
          facebook={profileData.facebook}
          twitter={profileData.twitter}
          instagram={profileData.instagram}
          linkedin={profileData.linkedin}
        />
      </div>
    </main>
  );
}
