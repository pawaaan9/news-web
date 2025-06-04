import Image, { StaticImageData } from "next/image";

interface LeaderboardAdProps {
  imageUrl: string | StaticImageData;
  linkUrl: string;
  alt?: string;
}

export default function LeaderboardAd({
  imageUrl,
  linkUrl,
  alt = "Advertisement",
}: LeaderboardAdProps) {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="lg:block w-[720px] h-[90px] rounded-lg overflow-hidden shadow-md bg-white mx-auto mb-6 hidden"
    >
      <div className="relative w-[720px] h-[90px]">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-contain"
          sizes="720px"
          priority
        />
      </div>
    </a>
  );
}
